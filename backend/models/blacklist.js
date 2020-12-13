const mongoose = require("mongoose");

const invalidTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, expires: "1d", unique: true },
  createdOn: { type: Date, default: Date.now() },
});

const blacklist = mongoose.model("blacklist-tokens", invalidTokenSchema);

module.exports = blacklist;
