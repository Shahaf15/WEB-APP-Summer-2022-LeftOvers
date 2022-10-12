const sql = require("./db.js");
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
module.exports = { createNewUser };