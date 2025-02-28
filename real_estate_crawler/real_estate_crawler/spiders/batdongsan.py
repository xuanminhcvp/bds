import scrapy


class BatdongsanSpider(scrapy.Spider):
    name = "batdongsan"
    allowed_domains = ["batdongsan.com.vn"]
    start_urls = ["https://batdongsan.com.vn"]

    def parse(self, response):
        for post in response.css("div.product-item"):
            yield {
                "title": post.css("h3 a::text").get(),
                "price": post.css(".product-price::text").get(),
                "area": post.css(".product-area::text").get(),
                "location": post.css(".product-city-dist::text").get(),
                "link": response.urljoin(post.css("h3 a::attr(href)").get())
            }

        next_page: response.css("a[rel='next']::attr(href)").get()
        if next_page:
            yield response.follow(next_page,self.parse)
    
        

