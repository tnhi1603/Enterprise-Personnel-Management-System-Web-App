const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const projectRoutes = require('./routes/projects');
const loginRoutes = require('./routes/login'); 
const dashboardRoutes = require('./routes/dashboard');
const employeeRoutes = require('./routes/employee');
const postRoutes = require('./routes/post');
const calendarRoutes = require('./routes/calendar');
// const documentsRoutes = require('./routes/documents');
// const communicationRoutes = require('./routes/communication');
const notificationRoutes = require('./routes/notification');
const addProjectRoutes = require('./routes/add_project');
const requestRoutes = require('./routes/requests');
const addNotiRoutes = require('./routes/addnoti');
const eventRoutes = require('./routes/event');
const addEventRoutes = require('./routes/addevent');
const addEmployeeRoutes = require('./routes/add_employee');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/projects', projectRoutes);
app.use('/api/login', loginRoutes); 
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/add_project', addProjectRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/post', postRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/addnoti', addNotiRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/addevent', addEventRoutes);
app.use('/api/add_employee', addEmployeeRoutes);
// app.use('/api/documents', documentsRoutes);
// app.use('/api/communication', communicationRoutes);
// app.use('/api/payroll', payrollRoutes);
// app.use('/api/staffInfo', staffInfoRoutes);
// app.use('/api/checkin', checkinRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
