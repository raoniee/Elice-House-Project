import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        roughAddr: {
            type: String,
            required: true,
        },
        detailAddr: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    { 
        collection: "users",
        timestamps: true 
    }
);

export { userSchema };