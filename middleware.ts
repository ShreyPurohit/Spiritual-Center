import { parse, serialize } from "cookie";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "./lib/auth/auth";

const handleRoleBasedRedirect = (req: NextRequest, role: string) => {
  const cookie = req.headers.get("cookie");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const cookies = parse(cookie);
  const authToken = cookies["auth"];

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decrypted = decrypt(authToken);
    if (!decrypted) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.headers.set(
        "Set-Cookie",
        serialize("auth", "", { path: "/", maxAge: -1 })
      );
      return response;
    }
    const user = JSON.parse(decrypted);

    if (user.role !== role) {
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error decrypting cookie:", error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.headers.set(
      "Set-Cookie",
      serialize("auth", "", { path: "/", maxAge: -1 })
    );
    return response;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.includes("/admin")) {
    return handleRoleBasedRedirect(req, "admin");
  }

  if (pathname.includes("/devotee")) {
    return handleRoleBasedRedirect(req, "devotee");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/devotee/:path*"],
};
