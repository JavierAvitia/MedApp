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
// Create a new quote using data passed in req.body
router.post("/boards", function(req, res) {
    db.Board.create(req.body).then(function(dbBoards) {
        dbBoards.setUsers([req.body.OwnerId], { through: { teamName: req.body.name } });
        res.json(dbBoards);
    });
});
// // Update an existing quote with a specified id param, using data in req.body
router.put("/boards/:id", function(req, res) {
		console.log(req.body,req.params.id,"TOT");
        db.Board.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }).then(function(dbBoards) {
            res.json(dbBoards);
        });
    });
// // Delete a specific quote using the id in req.params.id
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