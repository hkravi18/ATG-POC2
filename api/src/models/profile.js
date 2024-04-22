"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {}

  Profile.init(
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      about: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      bio: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      followerCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      connectionCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  return Profile;
};
