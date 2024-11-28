import mongoose from "mongoose";

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
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must contain atleast 5 character"]
    },
    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
    }
})

const User = mongoose.model("user", userSchema);

export default User;
