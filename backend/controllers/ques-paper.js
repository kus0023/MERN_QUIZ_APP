const axios = require("axios").default;
//URL of question
const URLS = require("../lib/url-tdb");

module.exports = {
  getQuestions: (req, res) => {
    const { amount, category, difficulty, type } = req.body;
    const errors = {};
    let isError = false;
    if (amount < 1 || amount > 50) {
      errors["amount"] = {
        provided: amount,
        mssg: "Amount should be between 1 to 50",
      };
      isError = true;
    }
    if (typeof Number.parseInt(category) !== "number") {
      errors["category"] = {
        provided: amount,
        mssg: "category should a number",
      };
      isError = true;
    }
    if (
      difficulty !== "easy" &&
      difficulty !== "medium" &&
      difficulty !== "hard"
    ) {
      errors["difficulty"] = {
        provided: difficulty,
        mssg: "difficulty should be easy, medium or hard",
      };
      isError = true;
    }
    if (type !== "multiple" && type !== "boolean") {
      errors["type"] = {
        provided: type,
        mssg: "type should be multiple or boolean",
      };
      isError = true;
    }

    if (isError) {
      return res.json({
        err: "Bad request.",
        errors,
      });
    }
    axios
      .get(URLS.questionUrl(amount, category, difficulty, type))
      .then((data) => {
        return res.json({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          err: "Internal error.",
          mssg: err,
        });
      });
  },
  getCategories: (req, res) => {
    axios
      .get(URLS.categoryUrl())
      .then((data) => {
        return res.json({
          data: data.data["trivia_categories"],
        });
      })
      .catch((err) => {
        return res.json({
          err: "Internal error. error in fetching data from axios.",
          mssg: err.message,
        });
      });
  },
  getresult: (req, res) => {},
};
