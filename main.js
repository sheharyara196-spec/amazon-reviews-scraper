import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

// Get input from the Apify Run form
const input = await Actor.getInput();

// Helper function to filter star ratings
const isMatchingStar = (ratingText, starFilter) => {
    if (starFilter === 'all') return true;
    const numStars = parseInt(ratingText[0]); // e.g., "5.0 out of 5 stars"
    return (
        (starFilter === 'one_star' && numStars === 1) ||
        (starFilter === 'two_star' && numStars === 2) ||
        (starFilter === 'three_star' && numStars === 3) ||
        (starFilter === 'four_star' && numStars === 4) ||
        (starFilter === 'five_star' && numStars === 5)
    );
};

const crawler = new CheerioCrawler({
    maxRequestsPerCrawl: input.maxReviews || 30,
    async requestHandler({ request, $ }) {
        const reviews = [];

        $('.review').each((index, el) => {
            const ratingText = $(el).find('.review-rating').text().trim();
            const reviewData = {
                title: $(el).find('.review-title').text().trim(),
                rating: ratingText,
                text: $(el).find('.review-text').text().trim(),
                reviewer: $(el).find('.review-author').text().trim(),
                date: $(el).find('.review-date').text().trim(),
            };

            // Apply star filter
            if (!isMatchingStar(ratingText, input.stars)) return;

            // Apply reviewerType filter
            if (input.reviewerType === 'verified_purchase') {
                const verified = $(el).find('.review-format-strip').text().includes('Verified Purchase');
                if (!verified) return;
            }

            // Optionally, check for media type
            if (input.mediaType === 'with_images' && $(el).find('.review-image-tile').length === 0) return;
            if (input.mediaType === 'with_videos' && $(el).find('video').length === 0) return;

            reviews.push(reviewData);

            // Stop if maxReviews reached
            if (reviews.length >= input.maxReviews) return false;
        });

        await Actor.pushData(reviews);
    },
});

await crawler.run(input.startUrls);

await Actor.exit();

