import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

try {
    const input = await Actor.getInput() || {};

    // Validate input
    const startUrls = Array.isArray(input.startUrls) ? input.startUrls : [];
    const maxReviews = parseInt(input.maxReviews) || 30;
    const stars = input.stars || 'all';
    const reviewerType = input.reviewerType || 'all_reviews';
    const mediaType = input.mediaType || 'all_contents';

    if (startUrls.length === 0) {
        console.log('No Start URLs provided. Exiting actor.');
        await Actor.exit();
    }

    const isMatchingStar = (ratingText, starFilter) => {
        if (starFilter === 'all') return true;
        const numStars = parseInt(ratingText[0]);
        if (isNaN(numStars)) return false;
        return (
            (starFilter === 'one_star' && numStars === 1) ||
            (starFilter === 'two_star' && numStars === 2) ||
            (starFilter === 'three_star' && numStars === 3) ||
            (starFilter === 'four_star' && numStars === 4) ||
            (starFilter === 'five_star' && numStars === 5)
        );
    };

    const crawler = new CheerioCrawler({
        maxRequestsPerCrawl: maxReviews,
        async requestHandler({ request, $ }) {
            try {
                const reviews = [];

                $('.review').each((index, el) => {
                    try {
                        const ratingText = $(el).find('.review-rating').text().trim() || '';
                        const reviewData = {
                            title: $(el).find('.review-title').text().trim() || '',
                            rating: ratingText,
                            text: $(el).find('.review-text').text().trim() || '',
                            reviewer: $(el).find('.review-author').text().trim() || '',
                            date: $(el).find('.review-date').text().trim() || '',
                        };

                        // Apply filters
                        if (!isMatchingStar(ratingText, stars)) return;

                        if (reviewerType === 'verified_purchase') {
                            const verified = $(el).find('.review-format-strip').text().includes('Verified Purchase');
                            if (!verified) return;
                        }

                        if (mediaType === 'with_images' && $(el).find('.review-image-tile').length === 0) return;
                        if (mediaType === 'with_videos' && $(el).find('video').length === 0) return;

                        reviews.push(reviewData);

                        if (reviews.length >= maxReviews) return false; // stop if max reached
                    } catch (innerErr) {
                        console.log('Error parsing a review element:', innerErr);
                    }
                });

                await Actor.pushData(reviews);
            } catch (pageErr) {
                console.log('Error processing page:', request.url, pageErr);
            }
        },
        failedRequestHandler({ request, error }) {
            console.log(`Request ${request.url} failed too many times:`, error.message);
        }
    });

    await crawler.run(startUrls);

} catch (err) {
    console.log('Critical error caught:', err);
} finally {
    await Actor.exit();
}
