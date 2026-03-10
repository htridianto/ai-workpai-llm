import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createFolder, isFolderNameDuplicate } from '@/server/models';

export async function POST(
    req: Request,
    { params }: { params: { sessionName: string } }
) {
    try {
        const body = await req.json();
        // do print all parameters & payload
        console.log("POST Waha HOOKS params:", JSON.stringify(params, null, 2));
        console.log("POST Waha HOOKS body:", JSON.stringify(body, null, 2));
        return NextResponse.json(body, { status: 200 });
    } catch (error) {
        console.error("POST Waha HOOKS error:", JSON.stringify(error, null, 2));
        return NextResponse.json({ message: 'Failed to create WhatsApp session' }, { status: 500 });
    }
}
