var SQL = require('./db');
const path = require('path');
const csv = require('csvtojson');
const csv2 = require('csv');
const { lutimes } = require('fs');



const CreateTable1 = (req, res) => {
    var Q1 = "CREATE TABLE users(id INT NOT NULL auto_increment,email VARCHAR(255) NOT NULL,fullname VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,phone VARCHAR(255) NOT NULL,PRIMARY KEY(id));";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })

}

const CreateTable2 = (req, res) => {
    var Q1 = "CREATE TABLE advertises(id INT NOT NULL auto_increment,vegtebales VARCHAR(255),hommade VARCHAR(255),other VARCHAR(255),date DATE NOT NULL,details VARCHAR(255),longtitude double,latitude double,ownerId INT not null,PRIMARY KEY(id)),FOREIGN KEY (ownerId) REFERENCES leftoversdb.users(id);";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })

}

const InsertData1 = (req, res) => {
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath = path.join(__dirname, "data1.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach((element) => {
                var NewEntry = {
                    "email": element.email,
                    "fullname": element.fullname,
                    "password": element.password,
                    "phone": element.phone
                };
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    else {
                        console.log("created row sucssefuly ");
                    }
                });
            });
        })
    res.send("data read");
};

const InsertData2 = (req, res) => {
    var Q2 = "INSERT INTO advertises SET ?";
    const csvFilePath = path.join(__dirname, "data2.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "vegtebales": element.vegtebales,
                    "hommade": element.hommade,
                    "other": element.other,
                    "date": element.date,
                    "details": element.details,
                    "longtitude": element.longtitude,
                    "latitude": element.latitude,
                    "ownerId": element.ownerId
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        })
    res.send("data read");
};



const ShowTable1 = (req, res) => {
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })
};

const ShowTable2 = (req, res) => {
    var Q3 = "SELECT * FROM advertises";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })
};

const DropTable1 = (req, res) => {
    var Q4 = "DROP TABLE users";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error om dropping table" + err });
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}

const DropTable2 = (req, res) => {
    var Q4 = "DROP TABLE advertises";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error om dropping table" + err });
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}


module.exports = { CreateTable1, CreateTable2, InsertData1, ShowTable1, DropTable1, InsertData2, ShowTable2, DropTable2 };
