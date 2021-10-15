/*TODO: include express, body-parser and cors*/
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let projectData = {};
/*TODO: Initialize the main project folder*/
app.use(express.static("website"));

/*TODO: add port number*/
const port = 3000;

/*TODO: function to test the server */
app.listen(port, listening);
function listening(){
    console.log(`Server running at http://localhost:${port}/`);
}

function sendData(req, res){
    res.send(projectData);
    projectData = {};
}

app.get("/all", sendData);


function addData(req, res){
    console.log(req.body);
    newData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    }
    projectData = req.body;
}

app.post("/add", addData);


