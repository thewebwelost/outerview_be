// const mongoose = require('mongoose');
// const Profile = require('./Profile').schema;
// const Application = require('./Application').schema;
// const ApplicationEvent = require('./ApplicationEvent').schema;

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   avatar: String,
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   createdAt: {
//     type: Date,
//     immutable: true,
//     default: () => Date.now(),
//   },
//   updatedAt: {
//     type: Date,
//     default: () => Date.now(),
//   },
//   profiles: [Profile],
//   applications: [Application],
//   events: [ApplicationEvent],
// });

// module.exports = mongoose.model('User', userSchema);
