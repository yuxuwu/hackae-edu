const express = require("express");
const passport = require("passport");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

/*
let db = new sqlite3.Database("./db_tables.db", function(err){
    if(err){
        return console.error(err.message);
    }
    console.log("Connected to local database")
});

//Add data to table
db.run("INSERT INTO langs(name) VALUES(?)", ["C"], function(err){
    if(err){
        return console.error(err.message);
    }
    console.log("Added 1 row to table");
});

db.close(function(err){
    if(err){
        return console.log(err.message);
    }
    console.log("Closed database connection")
});
*/

const app = express();

app.use(express.static("views/"))

app.get('/', function(req, res){ 
    res.sendFile(path.join(__dirname, "views/", "main.html"));
});

app.get('/org_register', function(req, res){ 
    res.sendFile(path.join(__dirname, "views/", "org_register.html"));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))