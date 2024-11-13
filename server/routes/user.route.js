const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/create', userController.createUser);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);

router.get('/id/:id', userController.getUserById);

router.get('/email/:email', userController.getUserByEmail);

router.get('/paginated', userController.getUsers);

module.exports = router;
