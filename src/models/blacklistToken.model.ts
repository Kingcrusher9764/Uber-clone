import mongoose from "mongoose"

interface IToken {
    token: string;
    createdAt: Date;
}

interface ITokenMethods {

}

interface blacklistTokenType extends mongoose.Model<IToken, {}, ITokenMethods> {

}

const blacklistTokenSchema = new mongoose.Schema<IToken, blacklistTokenType, ITokenMethods>({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 24 hours in seconds
    }
})

const BlackList = mongoose.model<IToken, blacklistTokenType>("BlacklistToken", blacklistTokenSchema)

export default BlackList
