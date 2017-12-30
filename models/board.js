module.exports = function(sequelize, DataTypes) {
    var Board = sequelize.define("Board", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        favorited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
//
    // const UserBoards = sequelize.define('UserBoards');

    Board.associate = function(models) {
        //console.log(models.User);
        Board.belongsTo(models.User, {
            foreignKey: {
                name: "OwnerId"
            },
            as: "Owner"
        });
        Board.belongsToMany(models.User, {
            through: "UserBoards"
        });
    };

    return Board;
};
