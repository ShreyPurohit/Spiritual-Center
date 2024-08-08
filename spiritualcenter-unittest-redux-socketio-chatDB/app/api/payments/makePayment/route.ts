import connectMongoDb from "@/lib/connectDatabase";
import { IPayment } from "@/lib/helpers/interfaces";
import PaymentModel from "@/models/PaymentModel";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const data: IPayment = await req.json()
  try {
    if (!data.made_by) return NextResponse.json({ message: "User ID Not Provided" }, { status: 500 })
    await connectMongoDb()
    const pay: IPayment | null = await PaymentModel.findOne({
      made_by: data.made_by,
      month: data.month,
      year: data.year
    })
    if (pay) {
      console.log("Updating Current Payment")
      pay.amount += Number(data.amount)
      await pay.save()
      return NextResponse.json({
        message: "Payment Updated Successfully",
        payment: pay
      }, { status: 200 })
    } else {
      console.log("Creating New Payment")
      const payment = await PaymentModel.create({
        made_by: data.made_by,
        month: data.month,
        year: data.year,
        amount: data.amount
      })
      return NextResponse.json({ message: "Payment Created Successfully", payment }, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error Making Payment', error }, { status: 500 });
  }
}