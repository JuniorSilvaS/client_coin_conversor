import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const protectedRouted = ['/editProfile'];
    if(protectedRouted.includes(request.nextUrl.pathname)) {
        if(!token) {
            return NextResponse.redirect(new URL('/', request.url))
        };
    };
    return NextResponse.next();
};