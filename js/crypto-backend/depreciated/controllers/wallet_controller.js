const db = require("../models");
const Wallet = db.wallet;
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
    const wallet = {
        wallid: req.body.wallid,
        wall_name: req.body.wall_name,
        usd: req.body.usd,
        user_id: req.body.user_id
    };

    // Save Coin in the database
    Wallet.create(wallet)
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

// Retrieve all Wallets from the database.
exports.findAll = (req, res) => {
    const wallet = req.query.wall_name;
    var condition = wallet ? {wall_name: {[Op.like]: `%${wallet}%`}} : null;

    Wallet.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Wallets."
            });
        });
};

// Find a single Coin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Wallet.findByPk(id)
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

    Wallet.update(req.body, {
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

    Wallet.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Coin was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Wallet with id=${id}. Maybe Wallet was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Coin with id=" + id
            });
        });
};

// Delete all Wallets from the database.
exports.deleteAll = (req, res) => {
    Wallet.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Wallets were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Wallets."
            });
        });
};

exports.findByUserId = (req, res) => {
    const user_id = req.params.user_id;
    Wallet.findAll({
        where: {
            user_id: user_id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Coin with usrid=" + user_id
            });
        });
}
