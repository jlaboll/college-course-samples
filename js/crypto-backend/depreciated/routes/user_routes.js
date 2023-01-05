module.exports = app => {
    const user = require("../controllers/user_controller");
    var router = require("express").Router();
    // Create a new user
    router.post("/", user.create);

    // Retrieve a single user with id
    router.get("/:id", user.findByID);

    // Update a user with id
    router.put("/:id", user.update);

    // Delete a user with id
    router.delete("/:id", user.delete);

    router.get("/", user.findByLogin);
    app.use('/api/user', router);
};