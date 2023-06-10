require('dotenv').config({path: '../.env'});

//modules imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


//set the express app & allow requests from any origin using cors
const app = express();
app.use(cors());

// Load the SwaggerAPI.yaml file & serve the SwaggerUI at /api-docs
const swaggerDocument = YAML.load('./swagger.yaml');
const routes = require('./routes/routes.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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

// Set up the routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//export the app for testing purposes
module.exports = app;
