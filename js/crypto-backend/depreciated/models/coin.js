/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('coin', {
        coinid: {
            autoIncrement: true,
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            primaryKey: true
        },
        amt: {
            type: DataTypes.DECIMAL(64, 8),
            allowNull: true
        },
        buy_price: {
            type: DataTypes.DECIMAL(64, 8),
            allowNull: true
        },
        api_id: {
            type: DataTypes.STRING(3),
            allowNull: true
        },
        wallid: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
            references: {
                model: 'wallet',
                key: 'wallid'
            }
        }
    }, {
        sequelize,
        tableName: 'coin',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "coinid"},
                ]
            },
            {
                name: "wallid",
                using: "BTREE",
                fields: [
                    {name: "wallid"},
                ]
            },
        ]
    });
};
