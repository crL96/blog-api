const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
require("dotenv").config();

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

module.exports = {
    createAdminUser,
};
