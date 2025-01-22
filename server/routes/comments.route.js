const express = require('express');
const User = require('../models/sequelize/agro/user.model');
const Coment = require('../models/sequelize/agro/comment.model');
const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, implement_id, service_id, text } = req.body;

  if (!user_id || !text || (!implement_id && !service_id)) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const comment = await Coment.create({ user_id, implement_id, service_id, text });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create comment.' });
  }
});

router.get('/implement/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      const comments = await Coment.findAll({
        where: { implement_id: postId }, // Corrigido para usar a sintaxe correta
        include: [{ model: User, attributes: ['username'] }],
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch comments.' });
    }
  });

router.get('/service/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      const comments = await Coment.findAll({
        where: { service_id: postId }, // Corrigido para usar a sintaxe correta
        include: [{ model: User, attributes: ['username'] }],
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch comments.' });
    }
  });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Coment.destroy({ where: { id } });
  
      if (!deleted) {
        return res.status(404).json({ error: 'Comment not found.' });
      }
  
      res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete comment.' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ error: 'Text field is required.' });
    }
  
    try {
      const comment = await Coment.findByPk(id);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found.' });
      }
  
      comment.text = text;
      await comment.save();
  
      res.status(200).json({ message: 'Comment updated successfully.', comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update comment.' });
    }
});
  
module.exports = router;
