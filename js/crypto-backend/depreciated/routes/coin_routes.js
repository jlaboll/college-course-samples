module.exports = app => {
    const coin = require("../controllers/coin_controller.js");
    var router = require("express").Router();
    // Create a new coin
    router.post("/", coin.create);

    // Retrieve all coins
    router.get("/", coin.findAll);

    // Retrieve a single coin with id
    router.get("/:id", coin.findOne);

    // Update a coin with id
    router.put("/:id", coin.update);

    // Delete a coin with id
    router.delete("/:id", coin.delete);

    // Delete all coin
    router.delete("/", coin.deleteAll);

    router.get("/:wallid", coin.findByWalletId);
    app.use('/api/coin', router);
};