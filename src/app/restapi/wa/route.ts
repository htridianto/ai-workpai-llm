import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { checkWaSession } from '@/server/actions/whatsapp';

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        // console.log("POST Folder body:", JSON.stringify(body, null, 2));
        const { name, workspaceId, parentFolderId, meta } = body;

        if (!name || !workspaceId || !meta || !meta.waNumber) {
            return NextResponse.json({ message: 'Name and Workspace ID and WA Number are required' }, { status: 400 });
        }

        const sessionName = (session.user.userName + '-' + meta.waNumber).replace(/[^a-zA-Z0-9-_]/g, '');    
        // do check wa device
        const deviceResponse = await fetch(`${process.env.WHATSAPP_API_URL}/devices/${sessionName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(process.env.WHATSAPP_API_KEY || '').toString('base64')}`
            }
        });
        const deviceData = await deviceResponse.json();   
        let deviceWA = deviceData.results;  
        if(!deviceResponse.ok || deviceData.code !== 'SUCCESS') {
            // fetch create session from whatsapp server
            const sessionResponse = await fetch(`${process.env.WHATSAPP_API_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(process.env.WHATSAPP_API_KEY || '').toString('base64')}`
                },
                body: JSON.stringify({
                    device_id: sessionName
                })
            });
            if (!sessionResponse.ok) {
                const errorData = await sessionResponse.json().catch(() => ({}));
                return NextResponse.json({ message: errorData.message || 'Failed to create session' }, { status: 500 });
            }
            const sessionData = await sessionResponse.json();
            console.log("Session Data:", JSON.stringify(sessionData, null, 2));
            if(sessionData.code !== 'SUCCESS') {
                return NextResponse.json({ message: 'Failed to create session' }, { status: 500 });
            }
            deviceWA = sessionData.results;   
        }   

        if(!deviceWA.state || deviceWA.state !== 'logged_in') {
            // do fetch session qr
            const qrResponse = await fetch(`${process.env.WHATSAPP_API_URL}/app/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(process.env.WHATSAPP_API_KEY || '').toString('base64')}`,
                    'X-Device-Id': encodeURIComponent(deviceWA.id)
                }
            });
            if (!qrResponse.ok) {
                const errorData = await qrResponse.json().catch(() => ({}));
                return NextResponse.json({ message: errorData.message || 'Failed to get session qr' }, { status: 500 });
            }
            const qrData = await qrResponse.json();
            console.log("QR Data:", JSON.stringify(qrData, null, 2));
            if(qrData.code !== 'SUCCESS') {
                return NextResponse.json({ message: 'Failed to get session qr' }, { status: 500 });
            }
            deviceWA.qr = {
                ...qrData.results,
                qr_link: qrData.results.qr_link.replace(process.env.WHATSAPP_API_URL || '', '/whatsapp')
            };
        }
        return NextResponse.json(deviceWA, { status: 201 });
    } catch (error) {
        console.error("POST WhatsApp error:", JSON.stringify(error, null, 2));
        return NextResponse.json({ message: 'Failed to create WhatsApp session' }, { status: 500 });
    }
}

// do handle check status session
export async function GET(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const sessionName = searchParams.get('sessionName');
    if (!sessionName) {
        return NextResponse.json({ message: 'Session Name is required' }, { status: 400 });
    }
    // do check wa device
    const checkSession = await checkWaSession(sessionName);
    if(!checkSession.ok) {
        return NextResponse.json({ message: checkSession.message }, { status: 500 });
    }
    return NextResponse.json(checkSession.data, { status: 200 });
}