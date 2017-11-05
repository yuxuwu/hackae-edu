const express = require("express")
const router = express.Router();

//Register
router.get('/org_register', function(req, res){
    res.render("org_register");
});

//Login
router.get('/login', function(req, res){
    res.render("login");
});

module.exports = router