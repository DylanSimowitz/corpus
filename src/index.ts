import playwright, { Browser } from "playwright";
import querystring from "querystring";

type OfferUpQueryParams = {
  q: string;
  delivery_param?: "s" | "p" | "p_s";
  radius?: 5 | 10 | 20 | 30 | 60;
};

export class OfferUp {
  private static readonly BASE_URL = "https://offerup.com";
  private static readonly SELECTORS = {
    items: "a[href^='/item/detail']",
    title: ":scope > div > div:last-of-type > span",
  };
  static async search(query: OfferUpQueryParams) {
    const browser = await playwright.firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = `${OfferUp.BASE_URL}/search/?${querystring.stringify(query)}`;
    await page.goto(url);
    await page.screenshot({ path: "image.png" });
    const items = await page.$$(this.SELECTORS.items);
    for (const item of items) {
      const title = await item
        .$(this.SELECTORS.title)
        .then((el) => el?.innerText());
      console.log(await item.getAttribute("href"), title);
    }
    await browser.close();
  }
}

(async () => {
  await OfferUp.search({ q: "grill" });
  console.log("finished");
})();
