import mongoose from "mongoose"

export default function ConnectDB(){
    mongoose.connect(process.env.DATABASE_URL as string)
        .then(()=>{
            console.log("Connected to database")
        })
        .catch((err)=>console.log(err))
}
