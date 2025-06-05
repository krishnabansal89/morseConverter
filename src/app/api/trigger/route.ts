// /app/api/trigger/route.ts
import { updatePageData } from "@/app/actions/pageAction";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'; 

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    try {
        await updatePageData();
        await revalidatePath('/sitemap'); // Revalidate the home page
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
    }
}


