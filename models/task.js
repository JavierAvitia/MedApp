module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
//
    // const UserTasks = sequelize.define('UserTasks');

    Task.associate = function(models) {
        //console.log(models.User);
        Task.belongsTo(models.User, {
            foreignKey: {
                name: "OwnerId"
            },
            as: "Owner"
        });
        Task.belongsToMany(models.User, {
            through: "UserTasks"
        });
    };

    return Task;
};
