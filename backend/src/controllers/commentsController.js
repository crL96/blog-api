const prisma = require("../config/prisma");
const { body, validationResult } = require("express-validator");

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

const validateComment = [
    body("author")
        .trim()
        .isAlphanumeric()
        .withMessage("Name must be alpha-numeric (only numbers and letters)")
        .isLength({ min: 1, max: 25 })
        .withMessage("Name must be between 1 and 25 characters"),
    body("message")
        .trim()
        .isLength({ min: 1, max: 300 })
        .withMessage("Comment must be between 1 and 300 characters"),
];

const submitComment = [
    validateComment,

    async (req, res) => {
        //Check if validation passed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }

        try {
            const response = await prisma.comment.create({
                data: {
                    author: req.body.author,
                    message: req.body.message,
                    postId: req.params.postId,
                }
            })
            res.json({ success: true, comment: response });
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
];

async function deleteComment(req, res) {
    try {
        const deletedComment = await prisma.comment.delete({
            where: {
                id: req.params.commentId
            }
        });
        res.json({ success: true, deleted: deletedComment});
    } catch (error) {
        if (error.message.startsWith("\nInvalid `prisma.comment.delete")) {
            res.status(404).json({ 
                success: false,
                message: "No comment found with requested id",
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
    deleteComment,
}