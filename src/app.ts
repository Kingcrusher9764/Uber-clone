import dotenv from "dotenv"
dotenv.config()
import ConnectDB from "db/db.ts"
ConnectDB()

import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

import userRoutes from "./routes/user.routes.ts"
import driverRoutes from "./routes/driver.routes.ts"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/users", userRoutes)
app.use("/drivers", driverRoutes)

export default app
