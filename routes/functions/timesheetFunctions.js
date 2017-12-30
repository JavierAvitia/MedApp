var bcrypt = require("bcryptjs");

var db = require("../../models");

module.exports = {
//Get timesheets using timesheet id or date/cookies
	getTimeSheets: function(req,res){
		var query = {};
    
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
	},
//Clock-in/create timesheet if does not exist
	clockIn: function(req,res){
		req.body.OwnerId = req.cookies.userId;

	    db.TimeSheet.create(req.body).then(function(dbTimeSheet) {
	        res.json(dbTimeSheet);
	    });
	},
//Update timesheets (lunchIn, lunchOut, clockOut) using req.body
	updateTimeSheet: function(req,res){
		db.TimeSheet.update(
	        req.body, {
	            where: {
	                id: req.params.id
	            }
	        }).then(function(dbTimesheet) {
	        res.json(dbTimesheet);
	    });
	}
}