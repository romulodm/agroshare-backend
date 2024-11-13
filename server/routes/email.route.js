const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

router.post('/password-code', emailController.passwordCode);

module.exports = router;
