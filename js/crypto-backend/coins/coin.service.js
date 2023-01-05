const config = require('config.json');
const crypto = require("crypto");
const { Op } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    const coins = await db.Coin.findAll();
    return coins.map(x => basicDetails(x));
}

async function getById(id) {
    const coin = await getCoin(id);
    return basicDetails(coin);
}

async function create(params) {
    const coin = new db.Coin(params);
    // save coin
    await coin.save();

    return basicDetails(coin);
}

async function update(id, params) {
    const coin = await getCoin(id);

    // copy params to coin and save
    Object.assign(coin, params);
    coin.updated = Date.now();
    await coin.save();

    return basicDetails(coin);
}

async function _delete(id) {
    const coin = await getCoin(id);
    await coin.destroy();
}

function basicDetails(coin) {
    const { id, coinQty, coinBoughtAt, coinAPIId, walletId, created, updated } = coin;
    return { id, coinQty, coinBoughtAt, coinAPIId, walletId, created, updated };
}

async function getCoin(id) {
    const coin = await db.Coin.findByPk(id);
    if (!coin) throw 'Coin not found';
    return coin;
}