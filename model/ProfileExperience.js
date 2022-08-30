const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileExperienceSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  responsibilities: [String],
  achievements: [String],
  keywords: [String],
});

module.exports = mongoose.model('ProfileExperience', profileExperienceSchema);
