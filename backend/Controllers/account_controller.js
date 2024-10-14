const accountModel = require("../models/account_model");

module.exports = {
  createAccount: async (req, res) => {
    const body = req.body;
    const newAccount = await accountModel.create(body);
    return res.status(201).json(newAccount);
  },
  getAccounts: async (req, res) => {
    const Accounts = await accountModel.find();
    return res.status(200).json(Accounts);
  },
};
