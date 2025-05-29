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
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
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
            return;
        }
        res.json(post);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

async function submitPost(req, res) {
    try {
        const response = await prisma.post.create({
            data: {
                title: req.body.title,
                text: req.body.text,
                published: req.body.published,
                authorId: req.user.id
            }
        })
        res.json(response);
    } catch (error) {
        if (error.message.startsWith("\nInvalid `prisma.post.create")) {
            res.status(400).json({ 
                message: "Bad request: include title, text, published (boolean)"
            })
            return;
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

async function updatePost(req, res) {
    try {
        const response = await prisma.post.update({
            data: {
                title: req.body.title,
                text: req.body.text,
                published: req.body.published  
            },
            where: {
                id: req.params.postId
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

async function deletePost(req, res) {
    try {
        //Delete post and all its comments
        const deleteComments = prisma.comment.deleteMany({
            where: {
                postId: req.params.postId
            }
        });
        const deletePost = prisma.post.delete({
            where: {
                id: req.params.postId
            },
        });
        const transaction = await prisma.$transaction([deleteComments, deletePost]);

        res.json({ success: true, deleted: transaction});
    } catch (error) {
        if (error.message.startsWith("\nInvalid `prisma.post.delete")) {
            res.status(404).json({ 
                success: false,
                message: "No post found with requested id",
            })
            return;
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

module.exports = {
    getAllPublishedPosts,
    getSinglePost,
    submitPost,
    updatePost,
    deletePost,
}