import express from "express"
import { validationResult } from "express-validator"

import Driver from "../models/driver.model.ts"
import BlacklistToken from "../models/blacklistToken.model.ts"
import * as driverService from "../services/driver.service.ts"
import { CustomRequest } from "utils/types/types.ts"

export async function registerDriver(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { fullname, email, password, vehicle } = req.body
    const isDriverAlreadyExist = await Driver.findOne({ email: email })
    if (isDriverAlreadyExist) {
        res.status(400).json({ message: "Driver already exist" })
        return
    }

    const hashPassword = await Driver.hashPassword(password)
    const driver = await driverService.createDriver({
        firstname: fullname.firstname,
        lastname: fullname?.lastname,
        password: hashPassword,
        email: email,
        color: vehicle?.color,
        plate: vehicle?.plate,
        capacity: vehicle?.capacity,
        vehicleType: vehicle?.vehicleType,
    })

    const token = driver.generateAuthToken()

    res.status(201).json({ token: token, driver: driver })
    return
}


export async function loginDriver(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body

    const driver = await Driver.findOne({ email }).select("+password")
    if (!driver) {
        res.status(400).json({ message: "Invalid email or password" })
        return
    }

    const isMatch = await driver.comparePassword(password)
    if (!isMatch) {
        res.status(400).json({ message: "Invalid email or password" })
        return
    }

    const token = driver.generateAuthToken()
    res.status(200).json({ token: token, driver: driver })
    return

}

export async function getDriverProfile(
    req: CustomRequest,
    res: express.Response,
    next: express.NextFunction,
) {
    res.status(200).json(req.driver)
}

export async function logoutDriver(
    req: CustomRequest,
    res: express.Response,
    next: express.NextFunction,
) {
    res.clearCookie("token")
    const token = req.cookies?.token as string || req.headers?.authorization?.split(" ")[1] as string;

    // Blacklist the token
    await BlacklistToken.create({ token: token })

    res.status(200).json({ message: "Logged out" })
}
