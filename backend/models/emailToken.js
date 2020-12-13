const mongoose = require("mongoose");

const emailTokenSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, expires: 42000 },
  createdOn: { type: Date, default: Date.now() },
});

const emailTokenModel = mongoose.model("email-tokens", emailTokenSchema);

module.exports = emailTokenModel;
