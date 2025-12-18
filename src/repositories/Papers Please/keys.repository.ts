import axios from "axios";

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

  async getFinalRedirectUrl(url: string): Promise<string | null> {
    try {
      const response = await axios.head(url, { maxRedirects: 5 });
      return response.request.res.responseUrl || url;
    } catch (err) {
      logger.error(`Error resolving redirect: ${err}`);
      return null;
    }
  }

  private extractText(html: string, regex: RegExp): string | null {
    const match = html.match(regex);
    if (!match) return null;
    return match[1].trim();
  }

  async getSellers(url: string): Promise<ISeller[] | null> {
    if (this.cache[url]) return this.cache[url];

    try {
      const { data: html } = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" } });

      // Encontrar todos los bloques de vendedores
      const sellerBlocks = html.match(/<div class="seller-container"[\s\S]*?<\/div>\s*<\/div>/g) || [];

      const sellers: ISeller[] = await Promise.all(
        sellerBlocks.map(async (block: string) => {
          const name = this.extractText(block, /<img[^>]+alt="([^"]+)"/);
          const priceOld = this.extractText(block, /<div class="oldprice [^"]*">\s*<span class="seller-price">([^<]+)<\/span>/);
          const priceNew = this.extractText(block, /<div class="newprice [^"]*">\s*<span class="seller-price">([^<]+)<\/span>/);
          const currency = this.extractText(block, /<span class="seller-currency-symbol">([^<]+)<\/span>/);
          const href = this.extractText(block, /<a[^>]+class="btn-seller"[^>]+href="([^"]+)"/);
          const link = href ? `https://www.cdkeysforgames.com${href}` : null;
          const region = this.extractText(block, /<span class="seller-subregion">([^<]+)<\/span>/);
          const version = this.extractText(block, /<div class="seller-version">([^<]+)<\/div>/);
          const discount = this.extractText(block, /<div class="price-coupon">([^<]+)<\/div>/);

          if (link) {
            const redirected = await this.getFinalRedirectUrl(link);
            if (redirected) return { name, priceOld, priceNew, currency, link: redirected, region, version, discount };
          }

          return { name, priceOld, priceNew, currency, link, region, version, discount };
        })
      );

      this.cache[url] = sellers;
      return sellers;
    } catch (err) {
      logger.error(`Error scraping with Axios: ${err}`);
      this.cache[url] = null;
      return null;
    }
  }
}

export default new CdkeysRepositories();
