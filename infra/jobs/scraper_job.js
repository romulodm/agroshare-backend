const cron = require('node-cron');
const ScraperService = require('../../application/services/ScraperService');
const Scraper = require('../scraping/scraper');
const UseCase = require('../../application/useCases/ProcessScrapedDataUseCase');

// Instanciar os componentes
const scraper = new Scraper();
const useCase = new UseCase();
const scraperService = new ScraperService(scraper, useCase);

// Agendar o job para rodar a cada 30 minutos
cron.schedule('*/30 * * * *', () => {
  console.log('Running scraper service...');
  scraperService.execute();
});
