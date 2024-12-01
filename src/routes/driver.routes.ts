import express from "express"
import { body } from "express-validator"
import * as driverController from "../controllers/driver.controller.ts"

const router = express.Router()

router.post("/register", [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("Firstname must contain atleast 3 character."),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain atleast 6 character."),
    body("vehicle.color").isLength({ min: 3 }).withMessage("vehicle color must contain atleast 3 character."),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("vehicle plate must contain atleast 3 character."),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("vehicle capacity must be atleast 1."),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("vehicle type must be one of car, motorcycle and auto only."),
],
    driverController.registerDriver
)

export default router
