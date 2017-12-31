module.exports = function(sequelize, DataTypes) {
    //CREATE USER ONLY IF NAME IS NOT EMAIL && ALL FIELDS FILLED
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // const UserBoards = sequelize.define('UserBoards');

    //LINK USER TO LIST (USER HAS MANY LISTs)
    User.associate = function(models) {
        User.hasMany(models.TimeSheet, {
            onDelete: "cascade",
            foreignKey: {
                name: "OwnerId"
            }
        });
        User.belongsToMany(models.Task, {
            through: "UserTasks"
        });
        // User.belongsToMany(models.Task, {
        //     through: "taskTeams"/*,
        //     as:"taskUsers"*/
        // });
    };

    return User;

};
