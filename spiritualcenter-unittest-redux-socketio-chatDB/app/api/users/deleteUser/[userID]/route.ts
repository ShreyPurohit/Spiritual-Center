import UserModel from "@/models/UserModel";
import connectMongoDb from "@/lib/connectDatabase";
import { NextRequest, NextResponse } from "next/server";
import deleteProfileFormAWS from "@/lib/aws/deleteFromBucket";

export async function DELETE(req: NextRequest, { params }: { params: { userID: string } }) {
  try {
    await connectMongoDb();
    const user = await UserModel.findByIdAndDelete(params.userID);
    if (!user) {
      return NextResponse.json({ message: `No User With ID ${params.userID} Found` }, { status: 404 });
    }
    if (user.photo) {
      deleteProfileFormAWS(user.photo)
    }
    return NextResponse.json({ message: "User Deleted Successfully", id: params.userID, }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error Creating Users", error }, { status: 500 });
  }
}
