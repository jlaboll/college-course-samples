const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");
var _coin = require("./coin");
var _user = require("./user");
var _wallet = require("./wallet");
const sqlize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: console.log,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

async function testConnection() {
    try {
        await sqlize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sqlize;
db.coin = _coin(sqlize, Sequelize);
db.user = _user(sqlize, Sequelize);
db.wallet = _wallet(sqlize, Sequelize);

db.coin.belongsTo(db.wallet, {foreignKey: "wallid"});
db.wallet.hasMany(db.coin, {foreignKey: "wallid"});
db.wallet.belongsTo(db.user, {foreignKey: "user_id"});
db.user.hasMany(db.wallet, {foreignKey: "user_id"});

module.exports = db;