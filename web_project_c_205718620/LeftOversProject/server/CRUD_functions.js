const sql = require("./db.js");
const validAdv = require('./ValidAdvertise.js');
var long = 0.0;
var lat = 0.0;
var ownerId = 0;
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
            long = req.body.long;
            lat = req.body.lat;
            ownerId = records[0].id;
            console.log("long: "+long+" lat: "+lat);
            res.render('main' , {User: records[0]});
            return;
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
        res.render('main');
        return;
        }
    });
};

module.exports = { createNewUser, loginUser, createNewAdv};