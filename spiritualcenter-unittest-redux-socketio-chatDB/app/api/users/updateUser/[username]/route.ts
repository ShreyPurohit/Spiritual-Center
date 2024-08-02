import connectMongoDb from "@/lib/connectDatabase";
import { makeUserName } from "@/lib/helpers/helperFunctions";
import { IUserCreateInput } from "@/lib/helpers/interfaces";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  await connectMongoDb();
  const data: IUserCreateInput = await req.json();
  const username = makeUserName(
    data.initiationDate,
    data.firstName,
    data.lastName
  );
  try {
    const user = await UserModel.findOneAndUpdate(
      { username: params.username },
      {
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
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json(
      {
        message: "User Updated Successfully",
        newuser: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Creating Users", error },
      { status: 500 }
    );
  }
}
