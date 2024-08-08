import connectMongoDb from "@/lib/connectDatabase";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDb();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "4");
    const skip = (page - 1) * limit;

    const users = await UserModel.find({ role: { $ne: "admin" } })
      .skip(skip)
      .limit(limit);
    const totalUsers = (await UserModel.countDocuments()) - 1;
    return NextResponse.json(
      {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
  }
}
