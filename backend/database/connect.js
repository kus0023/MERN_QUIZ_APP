const mongoose = require("mongoose");

module.exports = {
  connnectToDb: () => {
    // const uri = process.env.DATABASE_URI; //online database(Atlas)
    const uri = process.env.LOCAL_MONGODB; //local database
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
    mongoose.connect(uri, options, (err, conn) => {
      if (err) {
        console.error("Database connection failed.");
        console.error(err);
      } else {
        console.log("Connected to database.");
        // console.log(conn);
      }
    });
  },
};
