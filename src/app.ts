import dotenv from "dotenv"
dotenv.config()
import ConnectDB from "db/db.ts"
ConnectDB()

import cors from "cors"
import express from "express"

import userRoutes from "./routes/user.routes.ts"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("running new")
})

app.use("/users", userRoutes)

export default app
