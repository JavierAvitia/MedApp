var bcrypt = require("bcryptjs");

var db = require("../../models");

module.exports = {
//Get all boards or just one by ?id="X" query
    getBoards: function(req, res) {
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

    },
//Create new board using posted data and cookies
    createBoard: function(req, res) {
        var userId = req.cookies.userId;
        req.body.OwnerId = userId;

        db.User.findById(userId).then(function(dbUser){
            db.Board.create(req.body).then(function(dbBoard) {
                dbUser.addBoard(dbBoard);
                res.json(dbBoard);
            });
        });        
    },
//Update an existing board with /:id params using passed req.body
    updateBoard: function(req, res) {
        db.Board.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }
        ).then(function(dbBoards) {
                res.json(dbBoards);
        });
    },
//Delete an existing board with /:id params
    deleteBoard: function(req, res) {
        db.Board.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBoards) {
            res.json(dbBoards);
        });
    }
}