import { NextResponse, NextRequest } from 'next/server';
import cookie from 'cookie';

export function POST(req: NextRequest, res: NextResponse) {
    const response = NextResponse.json({ message: "Logged Out Successfully" }, { status: 200 });
    response.headers.set('Set-Cookie', cookie.serialize('auth', '', { maxAge: -1, path: '/' }))
    return response
}