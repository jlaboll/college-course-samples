const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (req.body == null) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = {
        user_id: 0,
        fname: req.body.fname.toString(),
        lname: req.body.lname.toString(),
        uname: req.body.uname.toString(),
        email: req.body.email.toString(),
        psswd: req.body.psswd.toString()
    };
    // Save User in the database
    User.build(user).save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const user = req.query.user_id;
    var condition = user ? {user: {[Op.like]: `%${user}%`}} : null;

    User.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with an id
exports.findByID = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
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

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Users were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
};

exports.findByLogin = (req, res) => {
    const uname = req.params.uname;
    const pass = req.params.psswd;

    User.findOne({
        where: {
            uname: uname,
            psswd: pass
        }
    })
        .then(data => {
            if (data.isEmpty()) res.status(500).send({
                message: "Error retrieving User with name=" + uname
            });
            else res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with name=" + uname
            });
        });


};
