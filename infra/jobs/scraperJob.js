const cron = require('node-cron');
const Scraper = require('../../domain/scraping/scraper')

const scraper = new Scraper();

cron.schedule('*/1 * * * *', async () => {
  try {
    await scraper.scrapeSoybean();
  } catch (error) {
    console.error('Error running the scraper:', error);
  }
});