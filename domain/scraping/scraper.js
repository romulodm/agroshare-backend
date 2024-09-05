const puppeteer = require('puppeteer');
require('dotenv').config();

class Scraper {
  async scrapeSoybean() {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
      });
      const page = await browser.newPage();
      console.log(`Running scrap soybean on: ${process.env.SCRAP_URL_SOYBEANS}`)
      await page.goto(process.env.SCRAP_URL_SOYBEANS, { waitUntil: 'networkidle0' });

      // Waiting for the body of the table that we are going to get
      await page.waitForSelector('.na-tabela tbody', { timeout: 5000 });

      // We extract the content of tbody
      const data = await page.evaluate(() => {
        const rows = document.querySelectorAll('.na-tabela tbody tr');
        const results = [];

        rows.forEach(row => {
          const columns = row.querySelectorAll('td');
          
          if (columns.length > 0) {
            results.push({
              praca: columns[0].innerText.trim(),
              preco: columns[1].innerText.trim(),
              variacao: columns[2].innerText.trim(),
            });
          }
        });

        return results;
      });

      console.log(data);

      await browser.close();

      return data;
    } catch (error) {
      console.error('Error scraping the soybean data on scraping:', error);
    }
  }
}

module.exports = Scraper;
