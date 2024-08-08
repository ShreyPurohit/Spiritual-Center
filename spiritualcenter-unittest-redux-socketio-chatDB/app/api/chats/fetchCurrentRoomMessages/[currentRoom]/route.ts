import connectMongoDb from '@/lib/connectDatabase';
import GroupModel from '@/models/GroupModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { currentRoom: string } }) {
    try {
        const roomID = params.currentRoom
        if (!roomID) return NextResponse.json({ message: "Room ID Not Found" }, { status: 400 })
        connectMongoDb()
        const room = await GroupModel.findOne({ roomID }).select('messages')
        if (!room) return NextResponse.json({ message: "Room Not Found In DB" }, { status: 404 })
        return NextResponse.json({ message: "Current Room Messages Fetched Successfully", messages: room.messages }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error Fetching Messages From Database" }, { status: 500 });
    }
}