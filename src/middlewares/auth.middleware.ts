import express from "express"
import jwt from "jsonwebtoken"

import User from "../models/user.model.ts"
import BlacklistToken from "../models/blacklistToken.model.ts"
import { CustomRequest, MyPayload } from "../utils/types/types.ts"


export async function authUser(
    req: CustomRequest,
    res: express.Response,
    next: express.NextFunction
) {

    const token = req.cookies?.token as string || req.headers?.authorization?.split(" ")[1] as string;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    const isBlackListed = await BlacklistToken.findOne({ token: token })
    if (isBlackListed) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as MyPayload
        const user = await User.findById(decoded._id)

        req.user = user
        next()

    } catch (err) {
        res.status(401).json({ message: "Unauthorized" })
    }

}
