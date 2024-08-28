import { parse } from "cookie";
import { decrypt } from "@/lib/auth/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) { return NextResponse.json("No User Found", { status: 404 }) }
    const cookies = parse(cookie);
    const authToken = cookies["auth"];
    const decryptedUser = decrypt(authToken);
    const user = JSON.parse(decryptedUser);

    return NextResponse.json({ message: "Success", user, }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "No User Logged In", error }, { status: 404 });
  }
}
