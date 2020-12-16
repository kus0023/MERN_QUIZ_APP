const mongoose = require("mongoose");

const Test = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now(), expires: "5s", index: true },
});

const TestModal = mongoose.model("tests", Test);
module.exports = TestModal;
