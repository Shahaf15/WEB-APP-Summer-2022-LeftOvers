const express = require("express");
const bodyParser = require("body-parser");
const crud = require('./CRUD_functions');
const app = express();
const port = 8080;
const path = require('path');
// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// simple route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "page1.html"))
});

app.post("/CreateNewCustomer", CRUD_functions.createNewCustomer);
// set port, listen for requests
app.listen(port, () => {
    console.log("Server is running on port 8080."
    );
});