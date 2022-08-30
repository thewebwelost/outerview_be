const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationContactSchema = new Schema({
  name: String,
  position: String,
  email: String,
  links: [
    {
      title: String,
      url: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('ApplicationContact', applicationContactSchema);
