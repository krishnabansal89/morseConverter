import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ["/morse-code-alphabets/:path*"],
};
  
export default function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    const prefix = "/morse-code-alphabets/";
    if (!url.pathname.startsWith(prefix)) {
        return NextResponse.next();
    }

    const rest = url.pathname.slice(prefix.length);
    if (!rest) return NextResponse.next();

    const lowered = rest.toLowerCase();

    if (rest !== lowered) {
        url.pathname = `${prefix}${lowered}`;
        // 308 = permanent redirect (preserves method & query string)
        return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();

}
