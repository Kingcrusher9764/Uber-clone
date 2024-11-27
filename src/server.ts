import app from "./app.ts"
import http from "http"

const PORT = process.env.PORT
const server = http.createServer(app)

server.listen(PORT, ()=>{
    console.log(`server started at PORT:${PORT}`)
})
