const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./Profile').schema;
const Application = require('./Application').schema;
const ApplicationEvent = require('./ApplicationEvent').schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  profiles: [Profile],
  applications: [Application],
  events: [ApplicationEvent],
});

module.exports = mongoose.model('User', userSchema);
