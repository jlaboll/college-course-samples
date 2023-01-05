/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('wallet', {
        wallid: {
            autoIncrement: true,
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            primaryKey: true
        },
        usd: {
            type: DataTypes.DECIMAL(64, 2),
            allowNull: true
        },
        user_id: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            }
        }
    }, {
        sequelize,
        tableName: 'wallet',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "wallid"},
                ]
            },
            {
                name: "user_id",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
        ]
    });
};
