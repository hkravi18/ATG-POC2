const CustomError = require("../utils/CustomError.js");
const { Profile } = require("../models");

//utils
const handleValidation = require("../utils/handleValidation.js");

// @desc    Post Details for user profiles
// route    POST /api/profile/
// @access  Public
const postProfile = async (req, res, next) => {
  try {
    const { name, url, about, bio, location, followerCount, connectionCount } =
      req.body;

    const validation = handleValidation({
      name: req.body?.name,
      url: req.body?.url,
    });

    if (!validation.valid) {
      const error = new CustomError(
        "Please fill all the fields",
        400,
        "post-profile",
        validation.message,
        "INVALID_REQUEST"
      );
      next(error);

      return;
    }

    const newProfile = await Profile.create({
      name,
      url,
      about,
      bio,
      location,
      followerCount,
      connectionCount,
    });

    res.status(200).send({
      success: true,
      data: {
        profile: newProfile,
      },
      error: null,
    });
  } catch (err) {
    const error = new CustomError(
      err.message,
      500,
      "verify-company",
      "Error",
      "INVALID"
    );
    next(error);
  }
};

module.exports = {
  postProfile,
};
