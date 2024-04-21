const express = require("express");
const router = express.Router();

const { postProfile } = require("../controllers/profileController.js");

router.post("/profiles", postProfile);

module.exports = router;
