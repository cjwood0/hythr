const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express(),
      postRoutes = require('./routes/posts');

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://hythr:' + process.env.MONGO_PASSWORD + '@cluster0-lnezh.mongodb.net/hythr?w=majority', { useNewUrlParser: true }).then(() => {
  console.log("Connected to DB");
}).catch(() => {
  console.log("connection failed!"); // wat do
}); // all the sharing feels so weird

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
