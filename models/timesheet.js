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

    return TimeSheet;
};
