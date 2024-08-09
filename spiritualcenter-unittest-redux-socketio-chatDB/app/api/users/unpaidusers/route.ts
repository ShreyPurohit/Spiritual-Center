import connectMongoDb from "@/lib/connectDatabase";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDb();
    const unpaidUsers = await UserModel.aggregate([
      {
        $lookup: { as: "payments", from: "payments", foreignField: "userId", localField: "_id", },
      },
      {
        $addFields: {
          hasPaid: {
            $in: [true, { $map: { input: "$payments", as: "payment", in: { $and: [{ $eq: ["$$payment.year", new Date().getFullYear()], }, { $eq: ["$$payment.month", new Date().getMonth() + 1], },], }, }, },],
          },
        },
      },
      { $match: { hasPaid: { $ne: true, }, role: { $ne: "admin" }, }, },
      { $project: { fullName: 1, email: 1, address: 1, username: 1, }, },
    ]);
    return NextResponse.json({ message: "Unpaid Users Fetched Successfully", unpaidUsers, });
  } catch (error) {
    return NextResponse.json({ message: "Error Fetching Unpaid Users" }, { status: 500 });
  }
}
