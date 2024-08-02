import connectMongoDb from "@/lib/connectDatabase";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDb()
        const userList = await UserModel.find().select('username fullName role photo')
        return NextResponse.json({ message: "Success", userList })
    } catch (error) {
        return NextResponse.json({ message: "Error Fetching User List" }, { status: 500 });
    }
}