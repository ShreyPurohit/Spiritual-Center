import uploadToBucket from "@/lib/aws/uploadToBucket";
import connectMongoDb from "@/lib/connectDatabase";
import { makeUserName } from "@/lib/helpers/helperFunctions";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    const formData = await req.formData()
    const body: any = Object.fromEntries(formData)
    await connectMongoDb()
    const image = body.imageUrl as File
    const username = makeUserName(body.initiationDate, body.firstName, body.lastName);
    if (image && !(image.type.includes('/jpeg') || image.type.includes('/png'))) {
      return NextResponse.json({ message: "Please Upload Image Only", }, { status: 400 });
    }
    if (image) {
      const fileBuffer = await image.arrayBuffer()
      const buffer = Buffer.from(fileBuffer)
      uploadToBucket(`${username}.${image.type.split('/')[1]}`, buffer)
    }
    const imgToDB = `${username}.${image.type.split('/')[1]}`
    await UserModel.create({
      username,
      fullName: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
      },
      address: {
        flatNumber: body.flatNumber,
        pinCode: body.pinCode,
        area: body.area,
        city: body.city,
        state: body.state,
      },
      email: body.email,
      initiationDate: body.initiationDate,
      photo: image ? imgToDB : "",
    });
    return NextResponse.json({ message: "User Created Successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error Creating Users", error }, { status: 500 });
  }
}