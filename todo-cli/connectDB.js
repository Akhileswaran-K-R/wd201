const Sequelize = require("sequelize");

const database = "todo_db";
const username = "postgres";
const password = "Touchmate1";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false, // to not show logging deatisl in cmd
});

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  connect,
  sequelize,
};
