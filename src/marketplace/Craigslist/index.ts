import querystring from "querystring";
import playwright from "playwright";
import xml from "xml2js";

type CraigslistItem = {
  id: number;
  price: number;
  date: string;
  title: string;
  url: string;
  location?: string;
  images: string[];
};

export type CraigslistQueryParams = {
  query: string;
};
export class Craigslist {
  private static domain = "";
  static set city(val: string) {
    Craigslist.domain = `https://${val}.craigslist.org`;
  }
  static async *search(
    query: CraigslistQueryParams,
    city: string
  ): AsyncGenerator<CraigslistItem[], CraigslistItem[] | undefined> {
    Craigslist.city = city;
    let url = `${this.domain}/search/sss?${querystring.stringify(query)}`;
    const browser = await playwright.firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    let hasNextPage = true;
    let data: CraigslistItem[];
    while (hasNextPage) {
      await page.goto(url);
      data = await page.evaluate<CraigslistItem[], string>((city) => {
        const items: CraigslistItem[] = Array.from(
          document.querySelectorAll("ul.rows > li")
        ).map((el) => {
          const id = Number(el.getAttribute("data-pid")!);
          const price = Number(
            el.querySelector<HTMLElement>(".result-price")?.innerText!.substr(1)
          );
          const date = el
            .querySelector(".result-date")
            ?.getAttribute("datetime")!;
          const title = el.querySelector<HTMLElement>(".result-title")
            ?.innerText!;
          const url = el
            .querySelector<HTMLElement>(".result-title")
            ?.getAttribute("href")!;
          const location =
            el
              .querySelector<HTMLElement>(".result-hood")
              ?.innerText.match(/\((.*)\)/)?.[1] ??
            el.querySelector<HTMLElement>(".nearby")?.getAttribute("title")!;
          const images = Array.from(el.querySelectorAll("img")).map(
            (el) => el.getAttribute("src")!
          );
          return {
            id,
            price,
            date,
            title,
            url,
            location,
            images,
          };
        });
        return items;
      }, city);
      yield data;
      url = await page
        .$eval(".button.next", (el) => {
          return el.getAttribute("href")!;
        })
        .then((url) => this.domain + url);
      hasNextPage = await page.$eval(".paginator", (el) => {
        return !el.classList.contains("lastpage");
      });
    }
    await browser.close();
    return data!;
  }

  static async searchRss(
    query: CraigslistQueryParams,
    city: string
  ): Promise<void> {
    Craigslist.city = city;
    const url = `${this.domain}/search/sss?format=rss&${querystring.stringify(
      query
    )}`;
    const browser = await playwright.firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(this.domain);
    const data = await page.evaluate<any, string>((url) => {
      return window
        .fetch(url, {
          credentials: "include",
          method: "GET",
          mode: "cors",
        })
        .then((res) => res.text());
    }, url);
    function getLocation(value: string) {
      return value.match(/\s\((.*)\)\s/)?.[1] ?? city;
    }
    function removePrice(value: string, name: string) {
      if (name === "title") {
        console.log(getLocation(value));

        return value.replace(/\s&.*$/, "");
      }
      return value;
    }
    await xml
      .parseStringPromise(data, {
        explicitRoot: false,
        explicitArray: false,
        tagNameProcessors: [xml.processors.stripPrefix],
        valueProcessors: [
          xml.processors.parseBooleans,
          xml.processors.parseNumbers,
          removePrice,
        ],
      })
      .then((result) => {
        //   delete result["rdf:RDF"];
        console.dir(result.item);
      });
  }
}
