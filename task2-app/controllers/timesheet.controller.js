// const Timesheet = require('../models/timesheet.model');

// exports.createTimesheet = async (req, res) => {
//     try {
//         const timesheet = await Timesheet.create(req.body);
//         res.status(201).json(timesheet);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getTimesheet = async (req, res) => {
//     try {
//         const timesheet = await Timesheet.findByPk(req.params.id);
//         if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });
//         res.status(200).json(timesheet);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getAllTimesheets = async (req, res) => {
//     try {
//         const timesheets = await Timesheet.findAll({
//             where: req.query,
//         });
//         res.status(200).json(timesheets);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.updateTimesheet = async (req, res) => {
//     try {
//         const timesheet = await Timesheet.findByPk(req.body.id);
//         if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });
//         await timesheet.update(req.body);
//         // res.status(200).json(times
//             // await timesheet.update(req.body);
//         res.status(200).json(timesheet);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     };
    
//     exports.deleteTimesheet = async (req, res) => {
//         try {
//             const timesheet = await Timesheet.findByPk(req.body.id);
//             if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });
//             await timesheet.destroy();
//             res.status(200).json({ message: 'Timesheet deleted' });
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     };

const User = require('../models/user.model');
const Project = require('../models/project.model');
const Timesheet = require('../models/timesheet.model');

// Create a new timesheet
exports.createTimesheet = async (req, res) => {
    try {
        const { taskName, date, hours } = req.body;

        

        const userId = parseInt(req.body.userId, 10);
        const projectId = parseInt(req.body.projectId, 10);

        // Validate input
        if (!userId || !projectId || !taskName || !date || hours === undefined) {
            return res.status(400).json({ message: 'User ID, Project ID, taskName, date, and hours are required' });
        }

        // Check if the user and project exist
        const [user, project] = await Promise.all([
            User.findByPk(userId),
            Project.findByPk(projectId),
        ]);

        console.log('Creating timesheet with data:', {
            userId,
            projectId,
            taskName,
            date,
            hours,
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Create timesheet
        const timesheet = await Timesheet.create({
            userId,
            projectId,
            taskName,
            date,
            hours,
        });

        res.status(201).json(timesheet);

        


    } catch (err) {
        console.error('Error creating timesheet:', err);
        res.status(500).json({ message: err.message });
    }
};

// Get timesheet by ID
exports.getTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByPk(req.params.id, {
            include: [User, Project], // Include associated user and project
        });

        if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });

        res.status(200).json(timesheet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all timesheets
exports.getAllTimesheets = async (req, res) => {
    try {
        const timesheets = await Timesheet.findAll({
            include: [User, Project], // Include associated user and project
            where: req.query, // Filter based on query params if any
        });

        res.status(200).json(timesheets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a timesheet
exports.updateTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByPk(req.body.id);

        if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });

        const { userId, projectId, taskName, date, hours } = req.body;

        // Check if the user and project exist
        const [user, project] = await Promise.all([
            User.findByPk(userId),
            Project.findByPk(projectId),
        ]);

        if (userId && !user) return res.status(404).json({ message: 'User not found' });
        if (projectId && !project) return res.status(404).json({ message: 'Project not found' });

        // Update timesheet
        await timesheet.update({
            userId,
            projectId,
            taskName,
            date,
            hours,
        });

        res.status(200).json(timesheet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a timesheet
exports.deleteTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.findByPk(req.body.id);

        if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });

        await timesheet.destroy();

        res.status(200).json({ message: 'Timesheet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
