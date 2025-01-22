const Post = require('../models/sequelize/agro/post.model');

exports.posts = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.findAll({ where: { userId } });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.feed = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: ['User', 'Category'] });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};