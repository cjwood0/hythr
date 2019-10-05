const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://hythr:' + process.env.MONGO_PASSWORD + '@cluster0-lnezh.mongodb.net/hythr?w=majority', { useNewUrlParser: true }).then(() => {
  console.log("Connected to DB");
}).catch(() => {
  console.log("connection failed!"); // wat do
}); // all the sharing feels so weird

app.use(bodyParser.json());

module.exports = app;
