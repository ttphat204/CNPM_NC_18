const express = require("express");
const router = express.Router();

const {
  createAccount,
  getAccounts,

} = require("../Controllers/account_controller");

// Register
router.route("/list").get(getAccounts);
router.route("/create").post(createAccount);



module.exports = router;
