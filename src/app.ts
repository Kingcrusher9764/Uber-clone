import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
//import ConnectDB from "db/db.ts"
//ConnectDB()

const app = express()

app.use(cors())

app.get("/", (req, res)=>{
    res.send("running new")
})

export default app
