module.exports = {
  questionUrl: (amount, category, difficulty, type) => {
    return (
      "https://opentdb.com/api.php?amount=" +
      amount +
      "&category=" +
      category +
      "&difficulty=" +
      difficulty +
      "&type=" +
      type
    );
  },
  categoryUrl: () => {
    return "https://opentdb.com/api_category.php";
  },
};
