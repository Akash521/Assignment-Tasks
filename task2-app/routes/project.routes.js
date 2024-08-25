const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', authMiddleware, projectController.createProject);
router.get('/:id', authMiddleware, projectController.getProject);
router.get('/', authMiddleware, projectController.getAllProjects);
router.post('/update', authMiddleware, projectController.updateProject);
router.post('/delete', authMiddleware, projectController.deleteProject);
router.post('/assign', authMiddleware, projectController.assignUserToProject); // New route for assignment

module.exports = router;
