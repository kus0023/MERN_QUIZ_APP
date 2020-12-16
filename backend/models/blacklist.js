const mongoose = require("mongoose");

const invalidTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now(), expires: "1d", index: true },
});

const blacklist = mongoose.model("blacklist-tokens", invalidTokenSchema);
module.exports = blacklist;
