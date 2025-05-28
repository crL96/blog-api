const prisma = require("../config/prisma");

async function getAllCommentsForPost(req, res) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: req.params.postId,
            }
        })
        res.json(comments);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

async function getSingleComment(req, res) {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: req.params.commentId
            }
        })
        if (comment == null) {
            res.status(404).json({ message: "No comment found with requested id"})
            return;
        }
        res.json(comment);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

async function submitComment(req, res) {
    try {
        const response = await prisma.comment.create({
            data: {
                author: req.body.author,
                message: req.body.message,
                postId: req.params.postId,
            }
        })
        res.json(response);
    } catch (error) {
        if (error.message.startsWith("\nInvalid `prisma.comment.create")) {
            res.status(400).json({ 
                message: "Bad request: include author and comment message"
            })
            return;
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error"})
    }
}

module.exports = {
    getAllCommentsForPost,
    getSingleComment,
    submitComment,
}