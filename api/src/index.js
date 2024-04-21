require("dotenv").config({
    path: `${__dirname}/../.env`,
});

//express app
const app = require("./app");

//middlewares
const errorHandler = require("./middlewares/errorHandler.js");

//port
const port = process.env.PORT || 4000;

//logger
const customLogger = require("./middlewares/logger.js");

app.use(customLogger);

app.use(errorHandler);