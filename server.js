require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const PORT = process.env.PORT || 8080;

// connect to MongoDB
connectDB();

const app = express();

app.use(credentials);
app.use(cors(corsOptions()));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routing
app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
  res.status(404);
});

// error logging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
