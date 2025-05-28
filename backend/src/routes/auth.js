const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/admin", authController.createAdminUser)

module.exports = router;