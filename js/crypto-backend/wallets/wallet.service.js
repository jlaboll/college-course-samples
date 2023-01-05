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


async function getAll(params) {
    const wallets = await db.Wallet.findAll({where:{
        userId: params.id
        }});
    return wallets.map(x => basicDetails(x));
}

async function getById(id) {
    const wallet = await getWallet(id);
    return basicDetails(wallet);
}

async function create(params) {
    const wallet = new db.Wallet(params);
    // save wallet
    await wallet.save();

    return basicDetails(wallet);
}

async function update(id, params) {
    const wallet = await getWallet(id);

    // copy params to wallet and save
    Object.assign(wallet, params);
    wallet.updated = Date.now();
    await wallet.save();

    return basicDetails(wallet);
}

async function _delete(id) {
    const wallet = await getWallet(id);
    await wallet.destroy();
}

function basicDetails(wallet) {
    const { id, walletName, walletUSDValue, userId, created, updated } = wallet;
    return { id, walletName, walletUSDValue, userId, created, updated };
}

async function getWallet(id) {
    const wallet = await db.Wallet.findByPk(id);
    if (!wallet) throw 'Coin not found';
    return wallet;
}