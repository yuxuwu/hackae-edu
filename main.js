var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3")
var app = express()

app.use(express.static("./views/"))
app.use(bodyParser());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "views/", "main.html"));
});

app.get('/org_register', function(req, res){
    res.sendFile(path.join(__dirname, "views/", "org_register.html"));
});

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, "views/", "login.html"));
});

app.post("/login", function(req, res){
    //open database
    let db = new sqlite3.Database("./db_tables.db", function(err){
        if(err){
            return console.error(err.message);
        }
        console.log("Connected to local database")
    });
    //lookup user
    let sql = "SELECT DISTINCT pass FROM org_acc WHERE name="+req.body["username"]
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
            if (row.passwd == req.body["passwd"]){
                res.sendFile(path.join(__dirname, "views/", "org_dashboard.html"));
            }
        });
      });
});

app.post('/org_register_add', function(req, res){
    //open database
    let db = new sqlite3.Database("./db_tables.db", function(err){
        if(err){
            return console.error(err.message);
        }
        console.log("Connected to local database")
    });

    //create table if doesnt exist
    db.run("CREATE TABLE IF NOT EXISTS org_acc(name TEXT, location TEXT, email TEXT, pass TEXT)", function(err){
        if(err){
            return console.error(err.message);
        }
        console.log("Created table")
    });

    //insert information to database
    db.run("INSERT INTO org_acc(name, location, email, pass) VALUES(?,?,?,?)", 
    [
        req.body["org_name"],
        req.body["location"],
        req.body["email"],
        req.body["passwd"]
    ], function(err){
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

    res.sendFile(path.join(__dirname, "views/", "main.html"));
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
