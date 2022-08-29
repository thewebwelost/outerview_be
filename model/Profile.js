const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  id: String,
  username: String,
  title: String,

  summary: String,
  details: [String],
  hardSkills: [String],
  softSkills: [String],

  experience: [], // TODO: add experience model
  education: [], // TODO: add education model
  achievements: [{ title: String, description: String }],

  contacts: {
    country: String,
    city: String,
    state: String,
    email: String,
    website: String,
    socials: [{ title: String, url: String }],
  },

  applications: [String],
});

module.exports = mongoose.model('Profile', profileSchema);
