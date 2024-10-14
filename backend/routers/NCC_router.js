const express = require("express");
const router = express.Router();

const { createNCC, getNCCs } = require("../Controllers/NCC_controller");

router.route("/").post(createNCC).get(getNCCs);

module.exports = router;
