var express = require("express");

var bcrypt = require("bcryptjs");

var db = require("../models");

var boardAPI = require("./functions/boardFunctions.js");
var timesheetAPI = require("./functions/timesheetFunctions.js");
var userAPI = require("./functions/userFunctions.js");

var router = new express.Router();

/*BEGIN BOARD ROUTES*/

//Get all boards or just one by ?id="X" query
router.get("/boards", function(req,res){
    boardAPI.getBoards(req,res);
});
//Create new board using posted data and cookies
router.post("/boards", function(req, res) {
    boardAPI.createBoard(req,res);       
});
//Update an existing board with /:id params using passed req.body
router.put("/boards/:id", function(req, res) {
    boardAPI.updateBoard(req, res);
});
//Delete an existing board with /:id params
router.delete("/boards/:id", function(req, res) {
    boardAPI.deleteBoard(req,res);
});

/*END BOARD ROUTES*/



/*BEGIN TIMESHEET ROUTES*/

//Gget timesheets using timesheet id or date/cookies
router.get("/timesheet", function(req, res) {
    timesheetAPI.getTimeSheets(req,res);
});
//Clock-in/create timesheet if does not exist
router.post("/clockIn", function(req, res) {
    timesheetAPI.clockIn(req,res);
});
//Update timesheets (lunchIn, lunchOut, clockOut) using req.body
router.put("/timesheet/:id", function(req, res) {
    timesheetAPI.updateTimeSheet(req,res);
});

/*END TIMESHEET ROUTES*/



/*BEGIN USER ROUTES*/

//Get all boards or just one by req.query
router.get("/users", function(req, res) {
    userAPI.getUsers(req,res);
});

//Validate password on user logins [possibly modify to use route on sign-up]
router.post("/users/login", function(req, res) {
    userAPI.validateUser(req,res);
});

//Create new user
router.post("/users", function(req, res) {
    userAPI.createUser(req,res);
});

//Delete user by id
router.delete("/users/:id", function(req, res) {
    userAPI.deleteUser(req,res);
});

//Add-remove user to-from a board
router.put("/UserBoards/:action", function(req, res) {
    userAPI.addRemoveUserBoard(req,res);
});

/*END USER ROUTES*/




// // to find a user by id, or to check if username exists for signups
// router.get("/users/:id", function(req, res) {
//     var query = {};
//     if (req.query.name || req.query.email) {
//         query = req.query;
//     } else {
//         query.id = req.params.id;
//     }
//     db.User.findOne({
//         where: query
//     }).then(function(dbUser) {
//         res.json(dbUser);
//     });
// });

module.exports = router;