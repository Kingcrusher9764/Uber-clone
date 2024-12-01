import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export interface IDriver {
    fullname: {
        firstname: string;
        lastname?: string;
    },
    email: string;
    password: string;
    socketId?: string;
    status: string;
    vehicle: {
        color: string;
        plate: string;
        capacity: number;
        vehicleType: string;
    }
    location: {
        lat: number;
        lng: number;
    }
}

export interface IDriverMethods {
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

interface driverSchemaType extends mongoose.Model<IDriver, {}, IDriverMethods> {
    hashPassword(password: string): Promise<string>;
}

const driverSchema = new mongoose.Schema<IDriver, driverSchemaType, IDriverMethods>({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "Firstname must contain atleast 3 character"],
        },
        lastname: {
            type: String,
            minLength: [3, "Lastname must contain atleast 3 character"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must contain atleast 3 character"],
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minLength: [3, "Plate must contain atleast 3 character"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be atleast 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "auto", "motorcycle"],
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

driverSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token
}

driverSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

driverSchema.statics.hashPassword = async function(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.HASH_SECRET))
}

const Driver = mongoose.model<IDriver, driverSchemaType>("Driver", driverSchema)
export default Driver
