var express = require("express");

var db = require("../models");

var router = new express.Router();

// Get all quotes (or optionally a specific quote with an id)
router.get("/boards/:id?", function(req, res) {
    //console.log(req.query.User_id)
    var query = {};
    if (req.query.id) {
        query.id = req.query.id;
    }

    console.log(query);

    db.Board.findAll({
        include: [{
                model: db.User,
                as: "Owner"
            }, {
                model: db.User,
                as: "Users"
            },
            db.List
        ],
        where: query
    }).then(function(dbBoards) {
        res.json(dbBoards);
    });
});
// Get all timesheets (or optionally a specific timesheet with a date)
router.get("/timesheet", function(req, res) {
    //console.log(req.params);
    var query = {};
    if (req.query.date) {
        query.date = req.query.date;
    }
    else if(req.query.id){
        query.id = req.query.id;
    }

    db.TimeSheet.findAll({
        // include: [{
        //         model: db.User,
        //         as: "Owner"
        //     }, {
        //         model: db.User,
        //         as: "Users"
        //     },
        //     db.List
        // ],
        where: query
    }).then(function(dbTimesheet) {
        res.json(dbTimesheet);
    });
});
// Create a new quote using data passed in req.body
router.post("/boards", function(req, res) {
    db.Board.create(req.body).then(function(dbBoards) {
        dbBoards.setUsers([req.body.OwnerId], { through: { teamName: req.body.name } });
        res.json(dbBoards);
    });
});
// clockIn
router.post("/clockIn", function(req, res) {
    db.TimeSheet.create(req.body).then(function(dbTimeSheet) {
        // dbBoards.setUsers([req.body.OwnerId], { through: { teamName: req.body.name } });
        res.json(dbTimeSheet);
    });
});
// Update an existing quote with a specified id param, using data in req.body
router.put("/boards/:id", function(req, res) {
    db.Board.update(
        req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbBoards) {
        res.json(dbBoards);
    });
});
// Update an existing timesheet with a specified id param, using data in req.body
router.put("/timesheet/:id", function(req, res) {
    db.TimeSheet.update(
        req.body, {
            where: {
                id: req.params.id
            }
        }).then(function(dbTimesheet) {
            console.log(dbTimesheet)
        res.json(dbTimesheet);
    });
});
// Delete a specific quote using the id in req.params.id
router.delete("/boards/:id", function(req, res) {
    db.Board.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbBoards) {
        res.json(dbBoards);
    });
});

module.exports = router;