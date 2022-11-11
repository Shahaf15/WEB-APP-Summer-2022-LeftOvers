const express = require('express')
const bodyParser = require("body-parser");
const CreateDB = require('./db/CreateDB');
const CRUD_operations = require("./db/CRUD_functions.js");
//const fileUpload = require('express-fileupload');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000
const path = require('path');
const validAdv = require('./db/ValidAdvertise.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get('/CreateTable1',CreateDB.CreateTable1);

app.get('/CreateTable1',CreateDB.CreateTable2);

app.get("/InsertData1", CreateDB.InsertData1);

app.get('/ShowTable1', CreateDB.ShowTable1);

app.get('/DropTable1', CreateDB.DropTable1);

app.get("/InsertData2", CreateDB.InsertData2);

app.get('/ShowTable2', CreateDB.ShowTable2);

app.get('/DropTable2', CreateDB.DropTable2);


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

app.post('/advertise', upload.single('picture'), (req, res,next) => {
  let advertiseInfo = req.body;
  console.log(req.file, req.body)
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