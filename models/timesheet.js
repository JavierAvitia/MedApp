module.exports = function(sequelize, DataTypes) {
    var TimeSheet = sequelize.define("TimeSheet", {
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clockIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lunchIn: {
            type: DataTypes.DATE
        },
        lunchOut: {
            type: DataTypes.DATE
        },
        clockOut: {
            type: DataTypes.DATE
        }
    });

// May create user association to timesheet later
/*    const UserTeam = sequelize.define('UserTeam', {
        teamName: DataTypes.STRING
    });

    Board.associate = function(models) {
        Board.hasMany(models.List, {
            onDelete: "cascade"
        });
        Board.belongsTo(models.User, {
            as:"Owner",
            foreignKey: {
                name: "OwnerId"
            }
        });
        Board.belongsToMany(models.User, {
            through: UserTeam,
            as:"Users"
        });
    };*/

    return TimeSheet;
};
