const express = require('express');
const Scraper = require('../../config/scraper');
const router = express.Router();

const scraper = new Scraper();

router.get('/soja', async (req, res) => {
  try {
    const data = await scraper.getCachedData('soybeans');
    const estado = req.query.estado;

    if (estado && data.dados[estado]) {
      // Enviar dados filtrados pelo estado
      res.json({
        ...data,
        dados: { [estado]: data.dados[estado] },
      });
    } else {
      // Enviar os dados completos
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data for soja' });
  }
});


  
router.get('/leite', async (req, res) => {
    try {
        const data = await scraper.getCachedData('milk');
        const estado = req.query.estado; 
        if (estado && data.dados[estado]) {
        res.json({ ...data, dados: { [estado]: data.dados[estado] } });
        } else {
        res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data for leite' });
    }
});
  
router.get('/milho', async (req, res) => {
    try {
      const data = await scraper.getCachedData('corn');
      const estado = req.query.estado; 
      if (estado && data.dados[estado]) {
        res.json({ ...data, dados: { [estado]: data.dados[estado] } });
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data for milho' });
    }
});
  
router.get('/boi', async (req, res) => {
    try {
      const data = await scraper.getCachedData('beef');
      const estado = req.query.estado;
      if (estado && data.dados[estado]) {
        res.json({ ...data, dados: { [estado]: data.dados[estado] } });
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data for boi' });
    }
});
  
router.get('/arroz', async (req, res) => {
    try {
      const data = await scraper.getCachedData('rice');
      const estado = req.query.estado;
      if (estado && data.dados[estado]) {
        res.json({ ...data, dados: { [estado]: data.dados[estado] } });
      } else {
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data for arroz' });
    }
});

module.exports = router;
