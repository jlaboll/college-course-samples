const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.Wallet = require('../wallets/wallet.model')(sequelize);
    db.Coin = require('../coins/coin.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    db.Account.hasMany(db.Wallet, {onDelete: 'CASCADE'});
    db.Wallet.belongsTo(db.Account, {foreignKey: 'userId'});
    db.Wallet.hasMany(db.Coin, {onDelete: 'CASCADE'});
    db.Coin.belongsTo(db.Wallet, {foreignKey: 'walledId'});
    
    // sync all models with database
    await sequelize.sync();
}