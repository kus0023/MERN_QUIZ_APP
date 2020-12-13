const express = require("express");
const cors = require("cors");

//dotenv config for environment variables
require("dotenv").config();

//init application
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.all("/", (req, res) => {
  res.send("API is working fine.");
});
app.use("/auth", require("./routes/auth"));

//listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is started at: " + PORT);
  //connecting to database.
  require("./database/connect").connnectToDb();
});
