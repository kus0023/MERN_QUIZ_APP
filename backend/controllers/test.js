const Test = require("../models/test");
module.exports = {
  name: (req, res) => {
    const name = req.params["name"];
    console.log(name);
    const data = { name };
    new Test(data).save((err, result) => {
      if (err) {
        return res.json({
          err: err.message,
        });
      }

      return res.json({
        status: "ok",
        result,
      });
    });
  },
};
