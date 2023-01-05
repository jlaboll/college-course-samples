const db = require("../models");
const Coin = db.coin;
const Op = db.Sequelize.Op;

// Create and Save a new Coin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Coin
    const coin = {
        coinid: req.body.coinid,
        amt: req.body.amt,
        buy_price: req.body.buy_price,
        api_id: req.body.api_id,
        wallid: req.body.wallid
    };

    // Save Coin in the database
    Coin.create(coin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Coin."
            });
        });
};

// Retrieve all Coins from the database.
exports.findAll = (req, res) => {
    const coin = req.query.api_id;
    var condition = coin ? {api_id: {[Op.like]: `%${coin}%`}} : null;

    Coin.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Coins."
            });
        });
};

// Find a single Coin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Coin.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Coin with id=" + id
            });
        });
};

// Update a Coin by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Coin.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Coin was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Coin with id=${id}. Maybe Coin was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Coin with id=" + id
            });
        });
};

// Delete a Coin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Coin.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Coin was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Coin with id=${id}. Maybe Coin was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Coin with id=" + id
            });
        });
};

// Delete all Coins from the database.
exports.deleteAll = (req, res) => {
    Coin.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Coins were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Coins."
            });
        });
};
exports.findByWalletId = (req, res) => {
    const wallid = req.params.wallid;
    Coin.findAll({
        where: {
            wallid: wallid
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Coins with wallid=" + wallid
            });
        });
}