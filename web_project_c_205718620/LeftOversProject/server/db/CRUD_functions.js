const sql = require("./db.js");
const validAdv = require('./ValidAdvertise.js');
//const fileUpload = require('express-fileupload');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const calcDistance = require('haversine-distance');
var long = 0.0;
var lat = 0.0;
var ownerId = 0;
var User = [];
const createNewUser = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newUser = {
        "email": req.body.email,
        "fullname": req.body.fullname,
        "password": req.body.password,
        "phone": req.body.phone
    };
    sql.query("INSERT INTO users SET ? ", newUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
        console.log("created user: ", { id: mysqlres.insertId, ...newUser });
        res.redirect('/Login');
        return;
    });
};

const loginUser = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    console.log(req.body);
    const user = "SELECT * from users WHERE email = '" +req.body.email+ "' AND password = '"+req.body.password+"'";
    console.log(user);
    sql.query(user, (err, records) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in Login user: " + err });
            return;
        }
        if(records.length > 0){
            console.log(records);
            long = req.body.long;
            lat = req.body.lat;
            ownerId = records[0].id;
            User.unshift(records[0]);
            console.log("long: "+long+" lat: "+lat);
            console.log(User);
            res.render('main' , {User, Answer: ""});
            return;
        }
        else{
            console.log("Something went wrong try again");
            res.render('Login', {Answer: "Something went wrong try again"});
        }
        
    });
};



const createNewAdv = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    let advertiseInfo = req.body;
    advertiseInfo = validAdv.cleanUP(advertiseInfo);
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newAdv = {
        "vegtebales": advertiseInfo.Vegtables,
        "hommade": advertiseInfo.HomemadeFood,
        "other": advertiseInfo.Other,
        "date": date,
        "details":advertiseInfo.MoreDetails,
        "longtitude":long,
        "latitude":lat,
        "ownerId":ownerId
    };
    console.log(newAdv);
    sql.query("INSERT INTO advertises SET ? ", newAdv, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating advertise: " + err });
            return;
        }
        else{
        console.log("created advertise: ", {AdvDetails: newAdv });
        res.render('main', {User, Answer: ""});
        return;
        }
    });
};


const seekLO = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const seek = "select a.id, a.vegtebales, a.hommade, a.other, a.date, a.details, a.longtitude, a.latitude, a.ownerId, u.fullname, u.phone from leftoversdb.advertises as a join leftoversdb.users as u where date > date_sub(now(), interval 2 day) and a.ownerId = u.id;"
    var vaildDistance = [];
    sql.query(seek, (err, records) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in Login user: " + err });
            return;
        }
        if(records.length > 0){
            //console.log(records);
            for (let i=0; i<records.length; i++){
                if(records[i].ownerId != ownerId)
                {//distance calculation, the results that shown will be only up to 5 KM from the user Who is search
                    let a = {lat: records[i].latitude , lng: records[i].longtitude}
                    let b = {lat: lat , lon: long}
                    console.log(calcDistance(a,b));
                    if(calcDistance(a,b) <= 5000.0){
                        vaildDistance.push(records[i]);
                    }
                }
            }
            if(vaildDistance.length > 0){
                console.log(vaildDistance);
                res.render('seekLeftOvers' , {Seek: vaildDistance, User});
                return; 
            }
            else{
                console.log("There is no Leftovers around");
                res.render('main', {Answer: "Sorry, there is no LeftOvers around"});
            }
        }
        else{
            console.log("There is no Leftovers around");
            res.render('main', {Answer: "Sorry, there is no LeftOvers around"});
        }
        
    });
};

module.exports = { createNewUser, loginUser, createNewAdv, seekLO, User};