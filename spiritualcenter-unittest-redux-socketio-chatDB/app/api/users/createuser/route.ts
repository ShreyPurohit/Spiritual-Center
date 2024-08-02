import connectMongoDb from "@/lib/connectDatabase";
import { makeUserName } from "@/lib/helpers/helperFunctions";
import { IUserCreateInput } from "@/lib/helpers/interfaces";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data: IUserCreateInput = await req.json();
  const username = makeUserName(data.initiationDate, data.firstName, data.lastName);

  try {
    await connectMongoDb();
    const user = await UserModel.create({
      username,
      fullName: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
      },
      address: {
        flatNumber: data.flatNumber,
        pinCode: data.pinCode,
        area: data.area,
        city: data.city,
        state: data.state,
      },
      email: data.email,
      initiationDate: data.initiationDate,
      photo: "",
    });

    return NextResponse.json({ message: "User Created Successfully", user, }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error Creating Users", error }, { status: 500 });
  }
}
