const express = require('express');
const router = express.Router();
const Implement = require('../models/sequelize/agro/implement.model');
const Service = require('../models/sequelize/agro/service.model')
const Coment = require('../models/sequelize/agro/comment.model');

const upload = require('../../config/multer');

router.post('/implements', upload.array('images', 5), async (req, res) => {
    const implementData = JSON.parse(req.body.data);

    const { title, description, price, location, availability_status, user_id } = implementData;
  
    if (!title || !user_id) {
      return res.status(400).json({ error: 'Title and user_id are required.' });
    }
  
    try {
      // Extrair os caminhos das imagens enviadas
      const imagePaths = req.files.map((file) => `/uploads/implements/${file.filename}`);
  
      // Criar o implemento no banco de dados
      const implement = await Implement.create({
        title,
        description,
        price,
        location,
        availability_status,
        user_id,
        images: imagePaths, // Assumindo que há um campo JSON ou array para imagens no modelo
      });
  
      res.status(201).json({ message: 'Implement created successfully.', implement });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create implement.' });
    }
});

router.post('/services', async (req, res) => {
    const { title, description, price_per_hour, location, availability_status, user_id } = req.body;
  
    if (!title || !user_id) {
      return res.status(400).json({ error: 'Title and user_id are required.' });
    }
  
    try {
      const service = await Service.create({
        title,
        description,
        price_per_hour,
        location,
        availability_status,
        user_id,
      });
  
      res.status(201).json({ message: 'Service created successfully.', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create service.' });
    }
});
  
router.get('/implements', async (req, res) => {
    try {
      const implements = await Implement.findAll({
        include: [
          {
            model: Coment
          },
        ],
      });
  
      res.status(200).json(implements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch implements.' });
    }
  });


router.get('/services', async (req, res) => {
    try {
      const services = await Service.findAll({
        include: [
          {
            model: Coment,
            as: 'comments',
            required: false,
          },
        ],
      });
  
      res.status(200).json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch services.' });
    }
});
  
module.exports = router;