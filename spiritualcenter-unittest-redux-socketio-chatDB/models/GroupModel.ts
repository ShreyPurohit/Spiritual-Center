import mongoose, { Schema } from "mongoose";
import { IGroupSchema } from "@/lib/helpers/interfaces";

const groupSchema: Schema<IGroupSchema> = new Schema<IGroupSchema>({
    roomID: {
        type: String,
        required: [true, "Room ID Is Required"],
        minLength: [5, "Room ID Must be Atleast 5 Characters Long"],
        maxLength: [20, "Room ID Must be Max 20 Characters Long"]
    },
    messages: [{
        text: {
            type: String,
            required: [true, "Text Is Required"],
            trim: true,
            minLength: [1, "Text Must be Atleast 1 Characters Long"]
        },
        username: {
            type: String,
            required: [true, "Username Is Required"],
            trim: true
        },
        createdAt: {
            type: String,
            required: [true, "Created At Is Required"],
            default: Date.now(),
            validate: {
                validator: (value: Date) => value <= new Date(),
                message: "Created Date Must Be Date In Past"
            }
        }
    }]
}, { timestamps: true })

const GroupModel = (mongoose.models.Group as mongoose.Model<IGroupSchema>) || mongoose.model<IGroupSchema>("Group", groupSchema)

export default GroupModel