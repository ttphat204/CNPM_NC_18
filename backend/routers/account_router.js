const express = require("express");
const router = express.Router();

const {
  createAccount,
  getAccounts,
} = require("../Controllers/account_controller");

router.route("/").post(createAccount).get(getAccounts);

module.exports = router;
