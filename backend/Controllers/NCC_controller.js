const NCCModel = require("../models/NCC_model");

module.exports = {
  createNCC: async (req, res) => {
    const body = req.body;
    const newNCC = await NCCModel.create(body);
    return res.status(201).json(newNCC);
  },
  getNCCs: async (req, res) => {
    const NCCs = await NCCModel.find();
    return res.status(200).json(NCCs);
  },
  updateNCC: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedNCC = await NCCModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedNCC);
  },
  deleteNCC: async (req, res) => {
    const id = req.params.id;
    const deleteNCC = await NCCModel.findByIdAndDelete(id);
    return res.status(200).json(deleteNCC);
  },
};
