const express = require("express");
const userController = require("../controller/UserController");
const authController = require("../controller/AuthController.js");
const isAuthenticated = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", isAuthenticated, userController.getUsers);

router.get("/auth/login", authController.getLoginForm);
router.post("/auth/login", authController.postLogin);
router.get("/auth/register", authController.getRegisterForm);
router.post("/auth/register", authController.postRegister);
router.post("/auth/logout", authController.logout);

module.exports = router;
