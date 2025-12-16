import puppeteer, { Browser } from "puppeteer";

export interface ISeller {
  name: string | null;
  priceOld: string | null;
  priceNew: string | null;
  currency: string | null;
  link: string | null;
  region: string | null;
  version: string | null;
  discount: string | null;
}

class CdkeysRepositories {
  private cache: Record<string, ISeller[] | null> = {};

  async getFinalRedirectUrl(url: string, browser: Browser): Promise<string | null> {
    const page = await browser.newPage();
    try {
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const resourceType = request.resourceType();
        if (["image", "stylesheet", "font", "media"].includes(resourceType)) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
      return page.url();
    } catch (err) {
      console.error("Error resolving redirect:", err);
      return null;
    } finally {
      await page.close();
    }
  }

  async getSellersWithBrowser(url: string): Promise<ISeller[] | null> {
    if (this.cache[url]) {
      return this.cache[url];
    }
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

      const sellers: ISeller[] = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".seller-container")).map((el) => {
          const name = el.querySelector(".seller-logo img")?.getAttribute("alt")?.trim() || null;
          const priceOld = el.querySelector(".oldprice .seller-price")?.textContent?.trim() || null;
          const priceNew = el.querySelector(".newprice .seller-price")?.textContent?.trim() || null;
          const currency = el.querySelector(".seller-currency-symbol")?.textContent?.trim() || null;
          const href = el.querySelector(".btn-seller")?.getAttribute("href") || null;
          const link = href ? `https://www.cdkeysforgames.com${href}` : null;
          const region = el.querySelector(".seller-region span.seller-subregion span")?.textContent?.trim() || null;
          const version = el.querySelector(".seller-version")?.textContent?.trim() || null;
          const discount = el.querySelector(".price-coupon")?.textContent?.trim() || null;

          return {
            name,
            priceOld,
            priceNew,
            currency,
            link,
            region,
            version,
            discount,
          };
        });
      });

      await Promise.all(
        sellers.map(async (seller) => {
          if (seller.link) {
            const redirected = await this.getFinalRedirectUrl(seller.link!, browser);
            if (redirected) {
              seller.link = redirected;
            }
          }
        })
      );

      await browser.close();

      this.cache[url] = sellers;

      return sellers;
    } catch (error) {
      console.error("Error scraping with Puppeteer:", error);
      this.cache[url] = null;
      return null;
    }
  }
}

export default new CdkeysRepositories();
