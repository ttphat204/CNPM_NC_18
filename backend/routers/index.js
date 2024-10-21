const categoryRouter = require("./category_router");
const NCCRouter = require("./NCC_router");
const accountRouter = require("./account_router");
const productRouter = require("./product_router");
const discountRouter = require("./discount_router");
const authRouter = require("./account_router");

module.exports = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/NCC", NCCRouter);
  app.use("/api/accounts", accountRouter);
  app.use("/api/products", productRouter);
  app.use("/api/discounts", discountRouter);
  app.use("/api/auth", authRouter);
};
