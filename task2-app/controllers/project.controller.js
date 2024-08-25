const User = require('../models/user.model');
const Project = require('../models/project.model');
// const UserProject = require('../models/user_project.model'); 


exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: req.query,
        });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.body.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        await project.update(req.body);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.body.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        await project.destroy();
        res.status(200).json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.assignUserToProject = async (req, res) => {
//     try {
//         const { userId, projectId } = req.body;

//         if (!userId || !projectId) {
//             return res.status(400).json({ message: 'User ID and Project ID are required' });
//         }

//         // console.log(await User.findAll())
//         // Check if the user and project exist
//         const [userExists, projectExists] = await Promise.all([
//             User.findByPk(userId),
//             Project.findByPk(projectId)
//         ]);

//         console.log(userExists)
//         console.log(projectExists)
//         if (!userExists) return res.status(404).json({ message: 'User not found' });
//         if (!projectExists) return res.status(404).json({ message: 'Project not found' });

//         // Assign user to project
//         // const assignment = await UserProject.create({ userId, projectId });
//         await User.addProjects([projectId]);
//         // res.status(201).json(assignment);
//         res.status(201).json({ message: 'User assigned to project' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// Assign user to project
exports.assignUserToProject = async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        if (!userId || !projectId) {
            return res.status(400).json({ message: 'User ID and Project ID are required' });
        }

        // Check if the user and project exist
        const [user, project] = await Promise.all([
            User.findByPk(userId),
            Project.findByPk(projectId)
        ]);

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Add user to project
        await user.addProject(project); // Use the generated association method
        res.status(201).json({ message: 'User assigned to project' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
