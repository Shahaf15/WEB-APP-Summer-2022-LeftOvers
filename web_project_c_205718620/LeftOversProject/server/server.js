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
  res.render('Login', {Answer: ""});
})

app.get('/signup', (req, res) => {
  res.render('signup', {});
})

app.get('/main', (req, res) => {
  res.render("main", {User: CRUD_operations.User, Answer: ""});
})

app.get('/advertise', (req, res) => {
  res.render('advertise', {User: CRUD_operations.User});
})

app.get('/seek', (req, res, next) => {
  //res.render('seekLeftOvers', {});
  next();
}, CRUD_operations.seekLO);

app.post('/Login', (CRUD_operations.loginUser));

app.post('/signup', (CRUD_operations.createNewUser));

app.post('/advertise', (req, res,next) => {
  let advertiseInfo = req.body;
  if (validAdv.CheckFields(advertiseInfo)) {
    console.log("info is valid");
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