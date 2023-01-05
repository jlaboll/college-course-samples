/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        user_id: {
            autoIncrement: true,
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            primaryKey: true
        },
        fname: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "null"
        },
        lname: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "null"
        },
        uname: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "null",
            unique: "uname"
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        psswd: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: "null"
        }
    }, {
        sequelize,
        tableName: 'user',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "uname",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "uname"},
                ]
            },
        ]
    });
};
