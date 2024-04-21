require("dotenv").config({
    path: `${__dirname}/../.env`,
});

//express app
const app = require("./app");

//middlewares
const errorHandler = require("./middlewares/errorHandler.js");

//port
const port = process.env.PORT || 4000;

app.use(errorHandler);