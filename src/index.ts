import { OfferUp } from "./marketplace/OfferUp";
import { Craigslist } from "./marketplace/Craigslist";

(async () => {
  //   const searchResults = await OfferUp.search({ q: "rtx" });
  //   console.log((await searchResults.next()).value?.feedItems[0]);
  //   console.log((await searchResults.next()).value?.feedItems[0]);
  //   console.log((await searchResults.next()).value?.feedItems[0]);
  //   @ts-ignore
  //   for await (const page of searchResults) {
  //     console.log(page.feedItems[0]);
  //   }
  const clSearch = await Craigslist.search({ query: "jetta" }, "sandiego");
  //@ts-ignore
  for await (const items of clSearch) {
    console.log(items[0]);
  }
})();
