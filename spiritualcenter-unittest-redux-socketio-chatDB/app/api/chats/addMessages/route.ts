import { NextResponse, NextRequest } from 'next/server';
import connectMongoDb from '@/lib/connectDatabase';
import GroupModel from '@/models/GroupModel';
import moment from 'moment';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDb();
        const { roomID, text, username, createdAt }: { roomID: string; text: string; username: string; createdAt: string } = await req.json();
        if (!roomID || !text || !username || !createdAt) return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        const group = await GroupModel.findOne({ roomID });
        if (!group) return NextResponse.json({ message: "Group not found" }, { status: 404 });

        group.messages.push({ text, username, createdAt });
        await group.save();
        return NextResponse.json({ message: "Message added successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error adding data to database" }, { status: 500 });
    }
}