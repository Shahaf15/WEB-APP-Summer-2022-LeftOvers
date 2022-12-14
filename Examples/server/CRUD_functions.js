const sql = require("./db.js");
const createNewCustomer = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newCustomer = {
        "email": req.body.email,
        "name": req.body.name
    };
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating customer: " + err });
            return;
        }
        console.log("created customer: ", { id: mysqlres.insertId, ...newCustomer });
        res.send({ message: "new customer created successfully" });
        return;
    });
};
module.exports = { createNewCustomer };