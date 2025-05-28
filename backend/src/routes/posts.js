const router = require("express").Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getAllPublishedPosts);

router.get("/:postId", postsController.getSinglePost);

module.exports = router;