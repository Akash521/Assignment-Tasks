const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheet.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', authMiddleware, timesheetController.createTimesheet);
router.get('/:id', authMiddleware, timesheetController.getTimesheet);
router.get('/', authMiddleware, timesheetController.getAllTimesheets);
router.post('/update', authMiddleware, timesheetController.updateTimesheet);
router.post('/delete', authMiddleware, timesheetController.deleteTimesheet);

module.exports = router;
