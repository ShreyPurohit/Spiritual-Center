import mongoose, { Schema } from "mongoose";
import { IGroupSchema } from "@/lib/helpers/interfaces";

const groupSchema: Schema<IGroupSchema> = new Schema<IGroupSchema>(
    {
        roomID: { type: String, required: [true, "Room ID Is Required"] },
        messages: [{
            text: { type: String, required: [true, "Text Is Required"], trim: true },
            username: { type: String, required: [true, "Username Is Required"], trim: true },
            createdAt: { type: String, required: [true, "Created At Is Required"] }
        }]
    }
)

const GroupModel = (mongoose.models.Group as mongoose.Model<IGroupSchema>) || mongoose.model<IGroupSchema>("Group", groupSchema)

export default GroupModel