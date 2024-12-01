import express from "express"
import { IUser } from "../../models/user.model.ts"
import { IDriver } from "../../models/driver.model.ts"
import { JwtPayload } from "jsonwebtoken"

export interface MyPayload extends JwtPayload {
    _id: string;
}

export interface CustomRequest extends express.Request {
    user: IUser
    driver: IDriver
}
