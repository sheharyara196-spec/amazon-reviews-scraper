import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

// Read input from the form (Start URLs, filters, maxReviews)
const input = await Actor.getInput();

// Initialize CheerioCrawler
const crawler = new CheerioCrawler({
    async requestHandler({ request, $ }) {
        const reviews = [];
        // Extract review details
        $('.review').each((index, el) => {
            reviews.push({
                title: $(el).find('.review-title').text(),
                rating: $(el).find('.review-rating').text(),
                text: $(el).find('.review-text').text(),
            });
        });
        await Actor.pushData(reviews);
    },
});

// Run the crawler on the URLs from the input form
await crawler.run(input.startUrls);

await Actor.exit();
