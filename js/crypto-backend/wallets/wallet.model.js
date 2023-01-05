const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        walletName: {
            type: DataTypes.STRING(128),
            allowNull: false,
            field: "walletName"
        },
        walletUSDValue: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: "walletUSDValue"
        },
        userId: {
            type: DataTypes.INTEGER,
            field: "userId",
            references: {
                key: "id",
                model: "accounts"
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

    return sequelize.define('wallets', attributes, options);
}