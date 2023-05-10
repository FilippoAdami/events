require('dotenv').config({path: '../.env'});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adRoutes = require('./routes/ads');

const app = express();

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database');
  } catch (err) {
    console.error('Failed to connect to database:', err);
  }
}
connectToDatabase();

// Use body-parser middleware to parse request body
app.use(bodyParser.json());

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Set up routes
app.use('/api', adRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


