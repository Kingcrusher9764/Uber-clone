import express from "express"
import { validationResult } from "express-validator"
import User from "../models/user.model.ts"
import * as userService from "../services/user.service.ts"
import { CustomRequest } from "utils/types/types.ts"
import BlackListToken from "../models/blacklistToken.model.ts"

export async function registerUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { fullname, email, password } = req.body
    const hashPassword = await User.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashPassword,
    })

    const token = user.generateAuthToken()
    res.status(201).json({ token: token, user: user })
    return
}


export async function loginUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("+password")
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" })
        return
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" })
        return
    }

    const token = user.generateAuthToken()
    res.cookie("token", token)
    res.status(200).json({ token: token, user: user })
    return

}


export async function getUserProfile(
    req: CustomRequest,
    res: express.Response,
    next: express.NextFunction
) {
    res.status(200).json(req.user)
}


export async function logoutUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {

    res.clearCookie("token")
    const token = req.cookies?.token as string || req.headers?.authorization.split(" ")[1] as string;

    // Blacklisted the jwt token
    await BlackListToken.create({ token: token })

    res.status(200).json({ message: "Logged out" })

}
