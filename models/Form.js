const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Zaivka", FormSchema);

module.exports = Application;
