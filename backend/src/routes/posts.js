const router = require("express").Router();
const postsController = require("../controllers/postsController");
const commentsRouter = require("./comments");

router.use("/:postId/comments", commentsRouter);

router.get("/", postsController.getAllPublishedPosts);
router.post("/", postsController.submitPost);

router.get("/:postId", postsController.getSinglePost);
router.put("/:postId", postsController.updatePost);



module.exports = router;