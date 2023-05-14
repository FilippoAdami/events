require('dotenv').config({path: '../.env'});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const annunciR = require('./routes/annunciR');
const personaR = require('./routes/personaR');
const attivitaR = require('./routes/attivitaR');
const bannerR = require('./routes/bannerR');
const bannerM = require('./models/bannerM');

//const userRoutes = require('./routes/userRoutes');
const userRoutes = require('./routes/personaR');
const amministratoriR = require('./routes/amministratoriR');

const app = express();
// Allow requests from any origin
app.use(cors());

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

// Use cors middleware with options
app.use(cors({
  origin: 'http://localhost:3000', // allow requests from this origin
  methods: 'GET,POST,PUT,DELETE', // allow these HTTP methods
  optionsSuccessStatus: 200 // return 200 for successful CORS pre-flight requests
}));

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Set up routes
app.use('/api', annunciR);
app.use('/api', personaR);
app.use('/api', attivitaR);
app.use('/api', bannerR);

app.use('/api', amministratoriR);
//app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  

