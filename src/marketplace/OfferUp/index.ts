import playwright from "playwright";
import querystring from "querystring";
import { SearchResponse } from "./types";

type OfferUpQueryParams = {
  q: string;
  delivery_param?: "s" | "p" | "p_s";
  radius?: 5 | 10 | 20 | 30 | 60;
  limit?: number;
  page_cursor?: string;
  lat?: number;
  lon?: number;
  platform?: "web";
};

const DefaultOfferUpQueryParams: Partial<OfferUpQueryParams> = {
  limit: 50,
  platform: "web",
  delivery_param: "p",
};

export class OfferUp {
  private static readonly BASE_URL = "https://offerup.com/api/web";
  static async *search(
    query: OfferUpQueryParams
  ): AsyncGenerator<
    SearchResponse,
    SearchResponse | undefined,
    SearchResponse
  > {
    query = { ...DefaultOfferUpQueryParams, ...query };
    const browser = await playwright.firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://offerup.com");
    let page_cursor = "";
    let data: SearchResponse;
    while (page_cursor !== undefined) {
      try {
        const url = `${OfferUp.BASE_URL}/search/?${querystring.stringify({
          ...query,
          page_cursor,
        })}`;
        data = await page.evaluate<SearchResponse, string>((url) => {
          return window
            .fetch(url, {
              credentials: "include",
              referrer: "https://offerup.com",
              method: "GET",
              mode: "cors",
            })
            .then((res) => res.json())
            .then((data) => data.searchResponse);
        }, url);
        page_cursor = data.nextPageCursor ?? undefined;
        if (data.feedItems[0].type === "banner") {
          return undefined;
        }
        yield data;
      } catch (e) {
        console.error(e);
      }
    }
    await browser.close();
    return data!;
  }
}
