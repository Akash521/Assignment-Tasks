const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');
const Project = require('./project.model');

const Timesheet = sequelize.define('Timesheet', {
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Timesheet.belongsTo(User);
// Timesheet.belongsTo(Project);
// Define associations
// Timesheet.belongsTo(User, { foreignKey: { allowNull: false } });
// Timesheet.belongsTo(Project, { foreignKey: { allowNull: false } });

Timesheet.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });
Timesheet.belongsTo(Project, { foreignKey: { name: 'projectId', allowNull: false } });


module.exports = Timesheet;
