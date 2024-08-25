const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', userController.createUser);
router.get('/:id', authMiddleware, userController.getUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.post('/update', authMiddleware, userController.updateUser);
router.post('/delete', authMiddleware, userController.deleteUser);

module.exports = router;
