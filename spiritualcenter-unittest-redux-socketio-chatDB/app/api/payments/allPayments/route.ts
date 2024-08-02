import { NextResponse } from 'next/server'
import PaymentModel from "@/models/PaymentModel";
import connectMongoDb from "@/lib/connectDatabase";

export async function GET() {
  try {
    await connectMongoDb()
    const allPayments = await PaymentModel.find().select('-__v')
    return NextResponse.json({
      message: "Payments Fetched Successfully",
      allPayments
    })
  } catch (error) {
    return NextResponse.json({ message: "Error Fetching All Payments" }, { status: 500 })
  }
}