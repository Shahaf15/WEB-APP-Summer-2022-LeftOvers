const express = require('express')
const bodyParser = require("body-parser");
const CRUD_operations = require("./CRUD_functions.js");
const app = express()
const port = 3000
const path = require('path');
const validAdv = require('./ValidAdvertise.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get('/Login', (req, res) => {
  res.render('Login', {});
})

app.get('/signup', (req, res) => {
  res.render('signup', {});
})

app.get('/main', (req, res) => {
  res.render("main", {});
})

app.get('/advertise', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/advertise.html"))
})

app.get('/seek', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/seekLeftOvers.html"))
})

app.post('/Login', (CRUD_operations.loginUser));

app.post('/signup', (CRUD_operations.createNewUser));

app.post('/advertise', (req, res,next) => {
  let advertiseInfo = req.body;
  if (validAdv.CheckFields(advertiseInfo)) {
    console.log("hey");
    //res.redirect('/main');
    next();
  }
  else {
    res.redirect('/advertise');
  }
  console.log(advertiseInfo);
}, CRUD_operations.createNewAdv);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})