const router = require("express").Router();
const postsController = require("../controllers/postsController");
const commentsRouter = require("./comments");
const passport = require("../config/passport");

router.use("/:postId/comments", commentsRouter);

router.get("/", postsController.getAllPublishedPosts);
router.post("/", passport.authenticate("jwt", { session: false }), postsController.submitPost);

router.get("/:postId", postsController.getSinglePost);
router.put("/:postId", passport.authenticate("jwt", { session: false }), postsController.updatePost);



module.exports = router;