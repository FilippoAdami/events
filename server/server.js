const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const UtenteAnonimo = require('./models/utente')

const uri = "mongodb+srv://IngSoft:Bucchiarellone69@cluster0.z2gzp5m.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));
const { Schema } = mongoose;

const dataSchema = new Schema({
  user_name: String,
  email: String,
  password: String,
  phone: String,
  instagram: String,
  bio: String,
  image: String,
});
  
const Data = mongoose.model('Data', dataSchema);

app.use(express.static(path.join(__dirname, 'client', 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.get('/datas', async (req, res) => {
  try {
    const datas = await Data.find();
    res.json(datas);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});


