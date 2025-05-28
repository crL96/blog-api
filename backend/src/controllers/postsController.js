const prisma = require("../config/prisma");

async function getAllPublishedPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                text: true,
                timestamp: true,
                author: {
                    select: { name: true }
                }
            },
            where: {
                published: true
            }
        });
        res.json(posts);
    } catch (error) {
        res.json({ message: error.message })
    }
};

async function getSinglePost(req, res) {
    try {
        const post = await prisma.post.findUnique({
            select: {
                id: true,
                title: true,
                text: true,
                timestamp: true,
                author: {
                    select: { name: true }
                }
            },
            where: {
                id: req.params.postId
            }
        });
        if (post == null) {
            res.status(404).json({ message: "No post found with requested id"})
        }
        res.json(post);
    }
    catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    getAllPublishedPosts,
    getSinglePost,
}