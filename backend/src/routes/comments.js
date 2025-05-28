const router = require("express").Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

router.get("/", commentsController.getAllCommentsForPost);

router.post("/", commentsController.submitComment);

router.get("/:commentId", commentsController.getSingleComment);


module.exports = router;