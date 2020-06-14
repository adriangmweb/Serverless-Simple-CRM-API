require('dotenv').config();

module.exports = {
  dev: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false
  },
};
