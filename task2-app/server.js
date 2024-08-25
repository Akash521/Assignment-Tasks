const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const timesheetRoutes = require('./routes/timesheet.routes');
const authRoutes = require('./routes/auth.routes');

dotenv.config();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/auth', authRoutes);

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
