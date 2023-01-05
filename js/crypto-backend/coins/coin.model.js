const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        coinQty: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0.0,
            field: "coinQty"
        },
        coinBoughtAt: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0.0,
            field: "coinBoughtAt"
        },
        coinAPIId: {
            type: DataTypes.STRING(3),
            allowNull: true,
            defaultValue: null,
            field: "coinAPIId"
        },
        walletId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "walletId",
            references: {
                key: "id",
                model: "wallets"
            }
        },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        defaultScope: {
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('coins', attributes, options);
}