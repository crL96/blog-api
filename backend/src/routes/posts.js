const router = require("express").Router();
const postsController = require("../controllers/postsController");
const commentsRouter = require("./comments");

router.use("/:postId/comments", commentsRouter);

router.get("/", postsController.getAllPublishedPosts);

router.get("/:postId", postsController.getSinglePost);

router.post("/", postsController.submitPost);


module.exports = router;