const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

async function createAdminUser(req, res) {
    if (req.body.admin !== process.env.ADMIN_PW) {
        res.status(403).json({ message: "Incorrect admin PW, denied" });
        return;
    }
    try {
        const hashedPw = await bcrypt.hash(req.body.password, 10);

        const response = await prisma.user.create({
            data: {
                name: req.body.name,
                username: req.body.username,
                password: hashedPw,
            },
        });
        res.json(response);
    } catch (error) {
        if (error.message.startsWith("\nInvalid `prisma.user.create")) {
            res.status(400).json({
                message: "Bad request: include name, username and password",
            });
            return;
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const message = "Incorrect username or password";

        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            res.status(401).json({
                success: false,
                message: message,
            });
            return;
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401).json({
                success: false,
                message: message,
            });
            return;
        }

        //Since user exists and password matches, issue JWT
        const payload = {
            sub: user.id,
            iat: Date.now(),
        };
        const expiresIn = "1d";

        const signedToken = jsonwebtoken.sign(
            payload,
            process.env.AUTH_JWT_SECRET,
            { expiresIn: expiresIn }
        );

        res.json({
            success: true,
            token: "Bearer " + signedToken,
            expires: expiresIn,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createAdminUser,
    loginUser,
};
