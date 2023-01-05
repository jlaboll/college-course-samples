module.exports = {
    HOST: "localhost",
    USER: "jlaboll",
    PASSWORD: "cryptocurrency",
    DB: "crypto",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};