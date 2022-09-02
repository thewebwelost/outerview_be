require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const PORT = process.env.PORT || 8080;

// connect to DB
connectDB();

const app = express();

app.use(credentials);
app.use(cors(corsOptions()));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routing
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.all('*', (req, res) => {
  res.status(404); // TODO: deal with 404
});

// error logging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
