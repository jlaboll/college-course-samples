const validateRequest = require('_middleware/validate-request');

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const coinService = require('./coin.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id',  updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    coinService.getAll()
        .then(coins => res.json(coins))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own coin and admins can get any coin
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    coinService.getById(req.params.id)
        .then(coin => coin ? res.json(coin) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        coinQty: Joi.decimal().required(),
        coinBoughtAt: Joi.decimal().required(),
        coinAPIId: Joi.string().required(),
        walletId: Joi.integer().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    coinService.create(req.body)
        .then(coin => res.json(coin))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        coinQty: Joi.decimal().empty(0.0),
        coinBoughtAt: Joi.decimal().empty(0.0),
        coinAPIId: Joi.string().empty(''),
        walletId: Joi.integer().empty(-1)
    });

    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own coin and admins can update any coin
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    coinService.update(req.params.id, req.body)
        .then(coin => res.json(coin))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own coin and admins can delete any coin
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    coinService.delete(req.params.id)
        .then(() => res.json({ message: 'Coin deleted successfully' }))
        .catch(next);
}
