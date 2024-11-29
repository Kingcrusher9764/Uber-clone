import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        select: false,
    },
    socketId: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password: string) {
    return await bcrypt.hash(password, 14)
}

const User = mongoose.model("user", userSchema);
export default User;
