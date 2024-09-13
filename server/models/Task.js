const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
