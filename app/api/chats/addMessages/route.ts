import connectMongoDb from '@/lib/connectDatabase';
import GroupModel from '@/models/GroupModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDb();
        const { roomID, text, username, createdAt }: { roomID: string; text: string; username: string; createdAt: string } = await req.json();
        if (!roomID || !text || !username || !createdAt) return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        const group = await GroupModel.findOne({ roomID }).select("-__v -createdAt -updatedAt");
        if (!group) return NextResponse.json({ message: "Group not found" }, { status: 404 });

        group.messages.push({ text, username, createdAt });
        await group.save();
        return NextResponse.json({ message: "Message added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/chats/addMessages", error);
        return NextResponse.json({ message: "Error adding data to database" }, { status: 500 });
    }
}