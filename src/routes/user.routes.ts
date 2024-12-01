import express from "express"
import { body } from "express-validator"
import * as userController from "../controllers/user.controller.ts"
import { authUser } from "../middlewares/auth.middleware.ts"

const router = express.Router()

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must contain atleast 3 character."),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long."),
],
    userController.registerUser
)

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long.")
], userController.loginUser)

router.get("/profile", authUser, userController.getUserProfile)

router.get("/logout", authUser, userController.logoutUser)

export default router;
