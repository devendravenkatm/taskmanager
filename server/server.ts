const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Adjust according to where your Angular app runs
}));


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});



// Routes
app.get('/', (req, res) => {
  res.send('Task Manager API');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);
