var bcrypt = require("bcryptjs");

var db = require("../../models");

module.exports = {
//Get all tasks or just one by ?id="X" query
    getTasks: function(req, res) {
        var query = {};
        if (req.query.id) {
            query.id = req.query.id;
        } else {
            query.OwnerId = req.cookies.userId;
        }

        db.Task.findAll({
            where: query,
            include: {
                    model: db.User,
                    as: "Users"
                }
        }).then(function(dbTasks) {
            res.json(dbTasks);
        });

    },
//Create new task using posted data and cookies
    createTask: function(req, res) {
        var userId = req.cookies.userId;
        req.body.OwnerId = userId;

        db.User.findById(userId).then(function(dbUser){
            db.Task.create(req.body).then(function(dbTask) {
                dbUser.addTask(dbTask);
                res.json(dbTask);
            });
        });        
    },
//Update an existing task with /:id params using passed req.body
    updateTask: function(req, res) {
        db.Task.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }
        ).then(function(dbTasks) {
                res.json(dbTasks);
        });
    },
//Delete an existing task with /:id params
    deleteTask: function(req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbTasks) {
            res.json(dbTasks);
        });
    }
}