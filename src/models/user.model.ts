import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must contain atleast 3 character"],
        },
        lastname: {
            type: String,
            minLength: [3, "Last name must contain atleast 3 character"],
        }
    },
})
