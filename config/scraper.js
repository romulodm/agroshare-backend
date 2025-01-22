const puppeteer = require('puppeteer');
const redisClient = require('./redis');
require('dotenv').config();

class Scraper {
  async scrapeCommodity(url, cacheKey) {
    try {
      const browser = await puppeteer.launch({
        headless: 'true', // Use 'new' para evitar problemas em algumas versões do Puppeteer
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--hide-scrollbars',
          '--mute-audio',
        ],
        defaultViewport: null, // Remove qualquer visualização padrão
      });

      const page = await browser.newPage();
      console.log(`Running scrap for: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle0' });

      await page.waitForSelector('.na-tabela tbody', { timeout: 5000 });

      const rawData = await page.evaluate(() => {
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

      await browser.close();

      const formattedData = this.formatData(rawData);

      // Armazenar os dados no Redis
      await this.setCacheData(cacheKey, formattedData);

      console.log(JSON.stringify(formattedData, null, 2));
      return formattedData;
    } catch (error) {
      console.error(`Error scraping data from ${url}:`, error);
    }
  }

  async getCachedData(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null; // Converte a string para JSON
    } catch (error) {
      console.error('Error retrieving data from Redis:', error);
      return null;
    }
  }

  async setCacheData(key, data) {
    try {
      // Armazenando os dados por 1 hora (3600 segundos)
      await redisClient.setEx(key, 3600, JSON.stringify(data));
      console.log('Data stored in Redis');
    } catch (error) {
      console.error('Error storing data in Redis:', error);
    }
  }

  formatData(rawData) {
    const result = {
      data: new Date().toISOString(),
      dados: {},
    };

    rawData.forEach(item => {
      const match = item.praca.match(/\/([A-Z]{2})/);
      const estado = match ? match[1] : 'OUTROS';

      const cidadePraça = item.praca.split('/');
      const cidade = cidadePraça[0]?.trim();
      const pracaMatch = cidadePraça[1]?.match(/\(([^)]+)\)/);
      const nomePraça = pracaMatch ? pracaMatch[1] : "";

      const preco = item.preco === 's/ cotação' ? null : parseFloat(item.preco.replace(',', '.'));
      const variacao = item.variacao === '-' ? null : parseFloat(item.variacao.replace(',', '.'));

      if (!result.dados[estado]) {
        result.dados[estado] = [];
      }

      result.dados[estado].push({
        cidade,
        nomePraça,
        preco,
        variacao,
      });
    });

    return result;
  }

  // Funções específicas para cada commodity
  async scrapeSoybean() {
    return this.scrapeCommodity(process.env.SCRAP_URL_SOYBEANS, 'soybeans');
  }

  async scrapeMilk() {
    return this.scrapeCommodity(process.env.SCRAP_URL_MILK, 'milk');
  }

  async scrapeCorn() {
    return this.scrapeCommodity(process.env.SCRAP_URL_CORN, 'corn');
  }

  async scrapeBeef() {
    return this.scrapeCommodity(process.env.SCRAP_URL_BEEF, 'beef');
  }

  async scrapeRice() {
    return this.scrapeCommodity(process.env.SCRAP_URL_RICE, 'rice');
  }
}

module.exports = Scraper;
