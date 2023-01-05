const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const walletService = require('./wallet.service');

// routes
router.get('/',  getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id',  updateSchema, update);
router.delete('/:id',  _delete);

module.exports = router;



function getAll(req, res, next) {
    walletService.getAll()
        .then(wallets => res.json(wallets))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own wallet and admins can get any wallet
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    walletService.getById(req.params.id)
        .then(wallet => wallet ? res.json(wallet) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        walletName: Joi.string().required(),
        walletUSDValue: Joi.decimal().required(),
        userId: Joi.integer().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    walletService.create(req.body)
        .then(wallet => res.json(wallet))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        walletName: Joi.string().empty(''),
        walletUSDValue: Joi.decimal().empty(0.0),
        userId: Joi.integer().empty(-1)
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own wallet and admins can update any wallet
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    walletService.update(req.params.id, req.body)
        .then(wallet => res.json(wallet))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own wallet and admins can delete any wallet
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    walletService.delete(req.params.id)
        .then(() => res.json({ message: 'Coin deleted successfully' }))
        .catch(next);
}
