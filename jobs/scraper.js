const cron = require('node-cron');
const Scraper = require('../config/scraper')

const scraper = new Scraper();

cron.schedule('*/6000 * * * *', async () => {
  try {
    await scraper.scrapeSoybean();
    await scraper.scrapeMilk();
    await scraper.scrapeCorn();
    await scraper.scrapeBeef();
    await scraper.scrapeRice();
  } catch (error) {
    console.error('Error running the scraper:', error);
  }
});