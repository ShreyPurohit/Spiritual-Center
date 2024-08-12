import connectMongoDb from "@/lib/connectDatabase";
import UserModel from '@/models/UserModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDb()
    const allPayments = await UserModel.aggregate([
      { $lookup: { from: "payments", localField: "_id", foreignField: "made_by", as: "payments", } },
      { $match: { $and: [{ "payments.0": { $exists: true, }, }, { role: { $ne: "admin" } }] } },
      { $project: { fullName: 1, username: 1, payments: 1 } },
    ])

    return NextResponse.json({ message: "Payments Fetched Successfully", allPayments })
  } catch (error) {
    console.error("Error in GET /api/payments/allPayments", error);
    return NextResponse.json({ message: "Error Fetching All Payments" }, { status: 500 })
  }
}