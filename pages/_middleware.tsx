import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest | any) {
    const token = await getToken({
        req: request, secret: process.env.JWT_SECRET
    });

    const { pathname } = request.nextUrl;
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }
    if (!token && pathname !== '/login') {
        const url = request.nextUrl.clone()
        url.pathname = '/login';
        return NextResponse.rewrite(url)
    }
}