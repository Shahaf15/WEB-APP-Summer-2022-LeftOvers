var sql = require('./db')

app.get("/customers", function(req, res){
    SQL.query("SELECT * FROM customers", (err, mysqlres) => {
    if (err) {
    console.log("error: ", err);
    res.status(400).send({message: "error in getting all customers: " + err});
    return;
    }
    console.log("got all customers...");
    res.send(mysqlres);
    return;
    });
    });