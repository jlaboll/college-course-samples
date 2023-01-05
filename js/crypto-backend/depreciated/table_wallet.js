module.exports = (sequelize, Sequelize) => {
    const attributes = {
        wallid: {
            type: Sequelize.MEDIUMINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: "wallid",
            unique: "wallid"
        },
        wall_name: {
            type: Sequelize.STRING(128),
            allowNull: false,
            comment: null
        },
        usd: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "usd"
        },
        user_id: {
            type: Sequelize.MEDIUMINT,
            allowNull: false,
            comment: null,
            field: "user_id",
            references: {
                key: "user_id",
                model: "user_model"
            }
        }
    };
    const options = {
        tableName: "wallet",
        comment: "",
        indexes: [{
            name: "user_id",
            unique: false,
            type: "BTREE",
            fields: ["user_id"]
        }]
    };
    return sequelize.define("wallet_model", attributes, options);
};