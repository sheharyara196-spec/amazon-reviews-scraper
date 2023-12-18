# Actor - Amazon Reviews Scraper

## Amazon Reviews scraper

Get ther reviews right away from [Amazon](https://www.amazon.com)! Extremely fast and perfectly efficient.

The Amazon Reviews data scraper supports the following features:

-   Scrape reviews from any product - Get reviews of any product from [Amazon](https://www.amazon.com) no matter the country. No limits, just data.

-   Get scores and comments - Retrieve all the comments and scores that has been provided by the users.

-   Specs of the product is at your fingertips - Product specifications, and all the related information are already included!

-   User provided images - Are you looking for the images? Yes, the actor gets them! Gather all the images from the reviews.

## Bugs, fixes, updates, and changelog

This scraper is under active development. If you have any feature requests you can create an issue from [here](https://github.com/epctex/amazon-reviews-scraper/issues).


## Input Parameters

The input of this scraper should be JSON containing the list of pages on [Amazon](https://www.amazon.com) that should be visited. Required fields are:

- `startUrls`: (Optional) (Array) List of [Amazon](https://www.amazon.com) URLs. You should only provide a product, or product reviews list URLs.

- `endPage`: (Optional) (Number) Final number of page that you want to scrape. The default is `Infinite`. This applies to all `search` requests and `startUrls` individually.

- `maxItems`: (Optional) (Number) You can limit scraped items. This should be useful when you search through the big lists or search results.

- `proxy`: (Required) (Proxy Object) Proxy configuration.

- `extendOutputFunction`: (Optional) (String) Function that takes a JQuery handle ($) as an argument and returns an object with data.

- `customMapFunction`: (Optional) (String) Function that takes each object's handle as an argument and returns the object with executing the function.

This solution requires the use of **Proxy servers**, either your own proxy servers or you can use [Apify Proxy](https://www.apify.com/docs/proxy).

### Tip

When you want to scrape over the reviews from  a specific URL, just copy and paste the link as one of the **startUrl**.

If you would like to scrape only the first page of the reviews list then put the link for the page and have the `endPage` as 1.

With the last approach that is explained above you can also fetch any interval of pages. If you provide the 5th page of a list and define the `endPage` parameter as 6 then you'll have the 5th and 6th pages only.

### Compute Unit Consumption

The actor is optimized to run blazing fast and scrape as many items as possible. Therefore, it forefronts all the detailed requests. If the actor doesn't block very often it'll scrape 100 reviews in less than a minute with ~0.01-0.03 compute units.

### Amazon Reviews Scraper Input example

```json
{
    "startUrls":[
        "https://www.amazon.com/Clorox-30966-Concentrated-Regular-Bleach/dp/B07HXTYS1W/ref=sr_1_3?crid=ZT0PLQMYO4WP&keywords=clorox&qid=1702901115&sprefix=cl%2Caps%2C278&sr=8-3",
        "https://www.amazon.com/Clorox-30966-Concentrated-Regular-Bleach/product-reviews/B07HXTYS1W/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews"
    ],
    "proxy": {
        "useApifyProxy": true
    },
    "endPage": 5,
    "maxItems": 100
}
```

## During the Run

During the run, the actor will output messages letting you know what is going on. Each message always contains a short label specifying which page from the provided list is currently specified.
When items are loaded from the page, you should see a message about this event with a loaded item count and total item count for each page.

If you provide incorrect input to the actor, it will immediately stop with a failure state and output an explanation of what is wrong.

## Amazon Reviews Export

During the run, the actor stores results into a dataset. Each item is a separate item in the dataset.

You can manage the results in any language (Python, PHP, Node JS/NPM). See the FAQ or <a href="https://www.apify.com/docs/api" target="blank">our API reference</a> to learn more about getting results from this Amazon Reviews actor.

## Scraped Amazon Reviews Output

The structure of each item in Amazon Reviews looks like this:

```json
{
	"id": "R3T33DVY3SW7K0",
	"type": "review",
	"score": 5,
	"title": "Gel limpiador",
	"url": "https://www.amazon.com/gp/customer-reviews/R3T33DVY3SW7K0?ASIN=B0060OMXUA",
	"helpfulCount": "",
	"dateAndLocation": "Reviewed in the United States on October 7, 2023",
	"description": "Tengo piel mixta, no cualquier jabón es adecuado para mi piel. Sin duda alguna es el mejor.",
	"isVerified": true,
	"specs": {
		"Size": "3.38 Fl Oz (Pack of 1)"
	},
	"images": [
		"https://m.media-amazon.com/images/I/71I2uKJEJeL.jpg"
	]
}
```

## Contact
Please visit us through [epctex.com](https://epctex.com) to see all the products that are available for you. If you are looking for any custom integration or so, please reach out to us through the chat box in [epctex.com](https://epctex.com). In need of support? [devops@epctex.com](mailto:devops@epctex.com) is at your service.
