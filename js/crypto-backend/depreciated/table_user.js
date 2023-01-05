module.exports = (sequelize, Sequelize) => {
    const attributes = {
        user_id: {
            type: Sequelize.MEDIUMINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: "user_id",
            unique: "user_id"
        },
        fname: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "fname",
            defaultValue: "fake_data"
        },
        lname: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "lname",
            defaultValue: "fake_data"
        },
        uname: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "uname",
            defaultValue: "fake_data"
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: true,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "email"
        },
        psswd: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "psswd",
            defaultValue: "fake_data"
        }
    };
    const options = {
        tableName: "user",
        comment: "",
        autoIncrementIdentity: "user_id",
        initialAutoIncrement: 1,
        timestamps: false
    };
    return sequelize.define("user_model", attributes, options);
};