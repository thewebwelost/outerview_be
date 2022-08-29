const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },

  profiles: { type: Array },
  applications: { type: Array },
  events: { type: Array },
});

module.exports = mongoose.model('User', userSchema);
