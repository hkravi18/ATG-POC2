require("dotenv").config({
  path: `${__dirname}/../.env`,
});

//express app
const app = require("./app");

//middlewares
const errorHandler = require("./middlewares/errorHandler.js");
const customLogger = require("./middlewares/logger.js");

//port
const port = process.env.PORT || 4000;

//db
const establishConnection = require("./db/establishConnection.js");

//routes
const profileRoutes = require("./routes/profileRoutes.js");

app.use(customLogger);

app.use("/api/profile", profileRoutes);

app.use(errorHandler);

establishConnection
  .then(() => {
    console.log("Database setup complete.");

    app.on("error", (err) => {
      if (err instanceof Error) {
        console.log("ERROR (App error): " + err?.message);
      } else {
        console.log("ERROR (App error): An unknown error occurred");
      }
    });

    app.listen(port, () => {
      console.log(`\nServer listening on ${port}\n`);
    });
  })
  .catch((err) => {
    console.error("Failed to setup database:", err.message);
  });
