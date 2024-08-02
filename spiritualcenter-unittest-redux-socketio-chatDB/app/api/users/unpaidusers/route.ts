import connectMongoDb from "@/lib/connectDatabase";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDb();
    const unpaidUsers = await UserModel.aggregate([
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "made_by",
          as: "payments",
        },
      },
      {
        $match: {
          $and: [{ payments: { $size: 0 } }, { role: { $ne: "admin" } }],
        },
      },
    ]);
    return NextResponse.json({
      message: "Unpaid Users Fetched Successfully",
      unpaidUsers,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Fetching Unpaid Users" },
      { status: 500 }
    );
  }
}
