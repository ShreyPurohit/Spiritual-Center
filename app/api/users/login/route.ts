import { encrypt } from "@/lib/auth/auth";
import connectMongoDb from "@/lib/connectDatabase";
import { ILoginInputs } from "@/lib/helpers/interfaces";
import UserModel from "@/models/UserModel";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectMongoDb();
    const data: ILoginInputs = await req.json();

    const user = await UserModel.findOne({ username: data.username }).select("-__v -createdAt -updatedAt");;

    if (!user) return NextResponse.json({ message: "Invalid user/password/role" }, { status: 404 });
    if (user.password !== data.password || user.role !== data.role) return NextResponse.json({ message: "Invalid user/password/role" }, { status: 401 });

    const cookieValue = encrypt(
      JSON.stringify({
        id: user._id,
        username: user.username,
        role: user.role,
        fullname: user.fullName,
        email: user.email,
        address: user.address,
        photo: user.photo,
        initiationDate: user.initiationDate
      })
    );

    const cookie = serialize("auth", cookieValue, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    const response = NextResponse.json({ message: "Logged In Successfully", user, }, { status: 200 });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("Error in POST /api/users/login", error);
    return NextResponse.json({ message: "Error Logging In", error }, { status: 500 });
  }
}
