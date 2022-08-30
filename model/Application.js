const mongoose = require('mongoose');
const ApplicationContact = require('./ApplicationContact').schema;

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  company: {
    name: String,
    location: String,
    size: String,
    product: String,
    values: [String],
    culture: String,
    tech: [String],
  },
  job: {
    description: String,
    responsibilities: [String],
    skills: [String],
  },
  contact: [ApplicationContact],
});

module.exports = mongoose.model('Application', applicationSchema);
