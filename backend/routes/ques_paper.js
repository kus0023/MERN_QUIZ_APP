const router = require("express").Router();
const quespaperController = require("../controllers/ques-paper");

router.get("/category-info", quespaperController.getCategories);
router.post("/question-paper", quespaperController.getQuestions);

module.exports = router;
