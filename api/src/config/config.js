require("dotenv").config({
  path: `${__dirname}/../../.env`,
});
const staticConfig = {
  dialect: "mysql",
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "db",
    host: process.env.DB_HOST || "127.0.0.1",
    ...staticConfig,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "db",
    host: process.env.DB_HOST || "127.0.0.1",
    ...staticConfig,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "db",
    host: process.env.DB_HOST || "127.0.0.1",
    ...staticConfig,
  },
};
