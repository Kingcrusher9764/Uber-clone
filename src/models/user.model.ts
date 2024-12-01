import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser {
    fullname: {
        firstname: string;
        lastname?: string;
    },
    email: string;
    password: string;
    socketId?: string;
}

export interface IUserMethods {
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

interface userSchemaType extends mongoose.Model<IUser, {}, IUserMethods> {
    hashPassword(password: string): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser, userSchemaType, IUserMethods>({
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
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token
}

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password: string) {
    return await bcrypt.hash(password, 14)
}

const User = mongoose.model<IUser, userSchemaType>("user", userSchema);
export default User
