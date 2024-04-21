const Sequelize = require("sequelize");
const config = require("../config/config.js").development;

async function establishConnection() {
  //attempting to connect to the database including the database name
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    //connection fails
    console.error("Unable to connect to the database:", error.message);

    //checking if the error is because the database does not exist
    if (error.original && error.original.code === "ER_BAD_DB_ERROR") {
      //creating a new connection without specifying the database
      const sequelizeForDBCreation = new Sequelize(
        "",
        config.username,
        config.password,
        {
          host: config.host,
          dialect: config.dialect,
        }
      );

      //running the query to create a new database
      await sequelizeForDBCreation.query(
        `CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`
      );
      console.log(`Database ${config.database} created successfully`);

      //closing the temporary connection
      await sequelizeForDBCreation.close();

      //retrying to establish the connection
      return establishConnection();
    } else {
      // If the error is not related to the database existence, throw the error
      console.log("Database connection failed");
      throw error;
    }
  }
}

module.exports = establishConnection();
