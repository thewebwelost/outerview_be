const mongoose = require('mongoose');
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
  contact: [
    {
      name: String,
      position: String,
      email: String,
      links: [
        {
          title: String,
          url: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Application', applicationSchema);
