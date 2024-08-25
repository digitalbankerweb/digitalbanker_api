const Sequelize = require("sequelize");

const userTable = require("./rest/users/model");

const sequelize = new Sequelize(
    "local",
    "root",
    "my-secret-pw",
    {
        host: "localhost",
        dialect: "mysql",
    }
);

const userModel = userTable(sequelize, Sequelize);
const Op = sequelize.Op;
const models = {
    Op,
    userModel
}

const connection = {}

module.exports = async () => {

    if (connection.connect) {
        console.log("Connected using existing connection");
        return models;
    }
    await sequelize.sync();
    await sequelize.authenticate();
    connection.connect = true;
    console.log("New connection is created");
    return models;

}