var express = require("express");

var bcrypt = require("bcryptjs");

var db = require("../models");

var router = new express.Router();

// Get all quotes (or optionally a specific quote with an id)
router.get("/boards", function(req, res) {
    var query = {};
    if (req.query.id) {
        query.id = req.query.id;
    }

    db.Board.findAll({
        where: query,
        include: {
                model: db.User,
                as: "Users"
            }
    }).then(function(dbBoards) {
        res.json(dbBoards);
    });

});
//add or remove user to-from a board
router.put("/UserBoards/:action", function(req, res) {
    var query = {};
    if (req.body.boardId) {
        query.id = req.body.boardId;
        db.Board.findOne({
            where: query
        }).then(function(dbBoard) {
            db.User.findById(req.body.userId).then(function(dbUser){

                switch(req.params.action){
                    case "add":
                        dbBoard.addUser(dbUser);
                    case "remove":
                        dbBoard.removeUser(dbUser);
                }

                res.json(dbBoard);
            });
        }).catch(function(error) {
            console.log(error);
        });
    }
    
});
// Create a new quote using data passed in req.body
router.post("/boards", function(req, res) {
    var userId = req.cookies.userId;
    req.body.OwnerId = userId;

    db.User.findById(userId).then(function(dbUser){
        db.Board.create(req.body).then(function(dbBoard) {
            dbUser.addBoard(dbBoard);
            res.json(dbBoard);
        });
    });        
});
// clockIn
router.post("/clockIn", function(req, res) {
    req.body.OwnerId = req.cookies.userId;

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
// Get all timesheets (or optionally a specific timesheet with a date)
router.get("/timesheet", function(req, res) {
    var query = {};

    // query.date = req.query.date;
    // query.OwnerId = userId;
//MAY MODIFY LATER TO TAKE MORE ARGUMENTS (BELOW, possible switch-case needed)
//NEED THE STUFF BELOW FOR THE LUNCH IN/OUT to work, used ID ):<
    if (req.query.date) {
        query.date = req.query.date;
        query.OwnerId = req.cookies.userId;
    } else if (req.query.id) {
        query.id = req.query.id;
    }

    db.TimeSheet.findAll({
        where: query
    }).then(function(dbTimesheet) {
        res.json(dbTimesheet);
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
        console.log(dbTimesheet,"kitty")
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

router.get("/users", function(req, res) {

    var query = {};
    if (req.query.id || req.query.name || req.query.email) {
        query = req.query;
    }

    db.User.findAll({
        where: query,
        include: [{
            model: db.Board,
            as: 'Boards'
        },{
            model: db.TimeSheet,
            as: 'TimeSheets'
        }]
}).then(function(dbUser) {
        res.json(dbUser);
    });
});

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

// to validate password on user logins
router.post("/users/login", function(req, res) {
    var query = req.query;
    db.User.findOne({
        where: query
    }).then(function(data) {
        if (data == null) {
            res.json({ username: true });
        } else {
            res.json({
                password: bcrypt.compareSync(req.body.password, data.password),
                id: data.id
            });
        }
    });
});

// to create new user
router.post("/users", function(req, res) {
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }).then(function(dbUser) {
        res.json(dbUser);
    });
});

// to delete user by id
router.delete("/users/:id", function(req, res) {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbUser) {
        res.json(dbUser);
    });
});


module.exports = router;