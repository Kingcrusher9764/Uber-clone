import express from "express"
import { validationResult } from "express-validator"

import Driver from "../models/driver.model.ts"
import * as driverService from "../services/driver.service.ts"

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
