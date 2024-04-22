const express = require("express");
const router = express.Router();

const { postProfile } = require("../controllers/profileController.js");

router.post("/", postProfile);

module.exports = router;
