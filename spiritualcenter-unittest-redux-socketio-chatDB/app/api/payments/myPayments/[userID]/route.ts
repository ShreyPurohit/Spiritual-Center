import connectMongoDb from "@/lib/connectDatabase";
import PaymentModel from "@/models/PaymentModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userID: string } }) {
  try {
    await connectMongoDb();
    const myPayments = await PaymentModel.find({
      made_by: params.userID,
    }).select("-__v");
    return NextResponse.json(
      {
        message: "My Payments Fetched Successfully",
        myPayments,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error Fetching My Payments", error }, { status: 500 });
  }
}
