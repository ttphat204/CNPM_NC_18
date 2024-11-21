const express = require("express");
const router = express.Router();

const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../Controllers/likelist_controller");

router.route("/add").post(addFavorite);
router.route("/remove/:id").delete(removeFavorite);
router.route("/:accountId").get(getFavorites);

module.exports = router;
