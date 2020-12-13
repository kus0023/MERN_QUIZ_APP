const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 15 },
  lastName: { type: String, required: true, maxlength: 15 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  mobile: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now() },
  isEmailVerified: { type: Boolean, default: false },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
