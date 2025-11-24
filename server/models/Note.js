const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  ticker: {
    type: String,
    required: true,
    uppercase: true // e.g., BTC, ETH
  },
  entryPrice: {
    type: Number,
    required: true
  },
  positionType: {
    type: String,
    enum: ['Long', 'Short'],
    default: 'Long'
  },
  note: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('note', noteSchema);