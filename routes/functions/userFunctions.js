var bcrypt = require("bcryptjs");

var db = require("../../models");

module.exports = {
//Get all users or just one by req.query
    getUsers: function(req, res) {

        var query = {};
        if (req.query.id || req.query.name || req.query.email) {
            query = req.query;
        }

        db.User.findAll({
            where: query,
            include: [{
                model: db.Task,
                as: 'Tasks'
            },{
                model: db.TimeSheet,
                as: 'TimeSheets'
            }]
    }).then(function(dbUser) {
            res.json(dbUser);
        });
    },
//Validate password on user logins [possibly modify to use route on sign-up]
    validateUser: function(req, res) {
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
    },
//Create new user
    createUser: function(req, res) {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    },
//Delete user by id
    deleteUser: function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    },
//Add-remove user to-from a task
    addRemoveUserTask: function(req, res) {
        var query = {};
        if (req.body.taskId) {
            query.id = req.body.taskId;
            db.Task.findOne({
                where: query
            }).then(function(dbTask) {
                db.User.findById(req.body.userId).then(function(dbUser){

                    switch(req.params.action){
                        case "add":
                            dbTask.addUser(dbUser);
                        case "remove":
                            dbTask.removeUser(dbUser);
                    }

                    res.json(dbTask);
                });
            }).catch(function(error) {
                console.log(error);
            });
        }  
    }
}
