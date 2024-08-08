import UserModel from "@/models/UserModel";
import connectMongoDb from "@/lib/connectDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get("name")

    try {
        await connectMongoDb()
        const userNames = await UserModel.aggregate([
            { $match: { "fullName.firstName": { $regex: name, $options: "i", }, }, },
            { $project: { fullName: 1, }, },
        ])

        return NextResponse.json({ userNames }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching user names', error }, { status: 500 });
    }
}