import connectMongoDb from "@/lib/connectDatabase";
import GroupModel from "@/models/GroupModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { roomID } = await req.json();
        if (!roomID) return NextResponse.json({ message: "Room ID is not provided" }, { status: 400 });
        await connectMongoDb();
        let room = await GroupModel.findOne({ roomID });
        if (!room) {
            room = await GroupModel.create({ roomID });
            if (!room) { return NextResponse.json({ message: "Failed to create new room" }, { status: 500 }); }
        } else {
            console.log("Found existing room:");
        }
        return NextResponse.json({ message: "Successfully joined or created room", currentRoom: room.roomID });
    } catch (error) {
        console.error("Error in POST /api/chats/makeGroup:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}