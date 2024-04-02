const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Mock database or data storage
let users = [
  { email: 'admin@deepersignals.com', password: 'password', firstName: 'Admin', lastName: 'Deepersignals', role: 'Admin', token: 'QWRtaW5Vc2Vy' },
  { email: 'user@deepersignals.com', password: 'password', firstName: 'User', lastName: 'Deepersignals', role: 'User', token: 'VXNlclVzZXI=' }
];
let userAssessments = [
  { id: 1, name: 'Core Drivers', usersResolved: 5, active: true, imageUrl: 'https://d1cuxz3dnd9slg.cloudfront.net/assessments/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg' }
];

// Middleware to check authorization
const authorize = (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = users.find(user => user.token === token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;
  next();
};

// Unauthorized Route for Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json(user);
});

// Authorized Route for User Dashboard
app.get('/api/userassessments', authorize, (req, res) => {
  res.json(userAssessments);
});

// Authorized Route for User Assessment Report
app.get('/api/userassessments/graph', authorize, (req, res) => {
  const assessmentId = req.query.id;
  // Here you would fetch graph data based on assessmentId
  // For simplicity, let's return mock data
  const graphData = { Agreeableness: 13.333333333333334, Drive: 21.666666666666668, Luck: 10, Openess: 30 };
  res.json({ data: graphData, type: 'bar' });
});

// Authorized Route for Admin Section (accessible by users with role 'Admin')
app.get('/api/admin/users', authorize, (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(users);
});

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Token');
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
