const router = require("express").Router();
const testController = require("../controllers/test");

router.get("/:name", testController.name);

module.exports = router;
