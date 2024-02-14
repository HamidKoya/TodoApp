// getting-started.js
const mongoose = require('mongoose');
const colors = require('colors')

const DBconnect = async (req,res)=> {
  await mongoose.connect('mongodb+srv://admin:1VTTP7TpPGenGhHg@cluster0.ihydhr6.mongodb.net/');
}

DBconnect().then(console.log('DB connected'.bgMagenta)).catch(err => console.log(err.bgRed));