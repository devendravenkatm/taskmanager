const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Angular app origin
}));

// MongoDB Connection
const dbURI = 'mongodb://127.0.0.1:27017/taskmanager'; // Local MongoDB instance

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected to local instance');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Routes
app.get('/', (req, res) => {
  res.send('Task Manager API');
});

// Use Authentication Routes
app.use('/api/auth', authRoutes); // Add auth routes

// Use Task Routes
app.use('/api', taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
