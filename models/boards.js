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
//s
    const UserTeam = sequelize.define('UserTeam', {
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
    };

    return Board;
};
