const router = require("express").Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");
const passport = require("../config/passport");

router.get("/", commentsController.getAllCommentsForPost);

router.post("/", commentsController.submitComment);

router.get("/:commentId", commentsController.getSingleComment);
router.delete(
    "/:commentId",
    passport.authenticate("jwt", { session: false }),
    commentsController.deleteComment
);

module.exports = router;
