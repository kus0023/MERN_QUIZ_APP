const mongoose = require("mongoose");

const emailTokenSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  createdOn: { type: Date, default: Date.now(), expires: 42000 },
});

const emailTokenModel = mongoose.model("email-tokens", emailTokenSchema);

module.exports = emailTokenModel;
