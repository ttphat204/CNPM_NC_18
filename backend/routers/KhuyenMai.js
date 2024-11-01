// E:\emart\server\routes\KhuyenMai.js
const express = require("express");

const {  createPromotion, getPromotionByCategory } = require("../Controllers/promotion_Controller.js");

const router = express.Router();

router.post('/add', createPromotion);
router.get('/category/:categoryId', getPromotionByCategory);
    
module.exports = router;
