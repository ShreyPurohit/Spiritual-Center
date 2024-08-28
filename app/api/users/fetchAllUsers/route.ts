import connectMongoDb from "@/lib/connectDatabase";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "4", 10);
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      UserModel.find({ role: { $ne: "admin" } })
        .skip(skip)
        .limit(limit)
        .select("-__v -createdAt -updatedAt"),
      UserModel.countDocuments({ role: { $ne: "admin" } })
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json(
      {
        users,
        totalUsers,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in GET /api/users/fetchAllUsers", error);
    return NextResponse.json(
      { message: "Error fetching users", error },
      { status: 500 }
    );
  }
}