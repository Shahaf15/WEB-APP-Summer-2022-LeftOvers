const express = require('express')
const bodyParser = require("body-parser");
const CRUD_operations = require("./CRUD_functions.js");
const app = express()
const port = 3000
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


app.get('/Login', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/Login.html"))
})

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname , "/views/signup.html"))
})

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname , "/views/main.html"))
})

app.get('/advertise', (req, res) => {
  res.sendFile(path.join(__dirname , "/views/advertise.html"))
})

app.get('/seek', (req, res) => {
  res.sendFile(path.join(__dirname , "/views/seekLeftOvers.html"))
})

app.post('/signup', (CRUD_operations.createNewUser))

app.post('/advertise', (req, res) => {
  let advertiseInfo = req.body;
  console.log(advertiseInfo);
  res.redirect('/main');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})