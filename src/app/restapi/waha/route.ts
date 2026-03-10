import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createFolder, isFolderNameDuplicate } from '@/server/models';

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
        //Session name can only contain alphanumeric characters, hyphens, and underscores (a-z, A-Z, 0-9, -, _) or be empty
        const sessionName = (session.user.userName + '-' + meta.waNumber).replace(/[^a-zA-Z0-9-_]/g, '');
        // do check wa device
        const deviceResponse = await fetch(`${process.env.WAHA_API_URL}/api/sessions/${sessionName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': process.env.WAHA_API_KEY || ''
            }
        });
        
        const deviceData = await deviceResponse.json();   
        console.log("Check Session:", JSON.stringify(deviceData, null, 2));
        let sessionWA = deviceData;  
        if(!deviceResponse.ok) {
            // fetch create session from whatsapp server
            const sessionResponse = await fetch(`${process.env.WAHA_API_URL}/api/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.WAHA_API_KEY || ''
                },
                body: JSON.stringify({
                    name: sessionName,
                    start: true,
                    config: {
                        metadata: {
                            waNumber: meta.waNumber,
                            user_id: session.user.id,
                            user_email: session.user.email
                        },
                        // webhooks: [{
                        //     url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/restapi/waha/${sessionName}`,
                        //     events: [
                        //         "message",
                        //         "session.status"
                        //     ]
                        // }]
                    }
                })
            });
            console.log("CreateSession Response:", sessionResponse);
            if (!sessionResponse.ok) {
                const errorData = await sessionResponse.json().catch(() => ({}));
                return NextResponse.json({ message: errorData.message || 'Failed to create session' }, { status: 500 });
            }
            const sessionData = await sessionResponse.json();
            console.log("CreateSession Data:", JSON.stringify(sessionData, null, 2));
            sessionWA = sessionData;   
        }else if(sessionWA.status == 'STOPPED') {
            const sessionResponse = await fetch(`${process.env.WAHA_API_URL}/api/sessions/${sessionName}/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.WAHA_API_KEY || ''
                }
            });
            const sessionData = await sessionResponse.json();
            console.log("Session Started:", JSON.stringify(sessionData, null, 2));
            sessionWA = sessionData; 
        }
        
        if(sessionWA.status == 'STARTING' || sessionWA.status == 'SCAN_QR_CODE') {
            // do fetch session qr
            const qrResponse = await fetch(`${process.env.WAHA_API_URL}/api/${sessionName}/auth/qr`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Api-Key': process.env.WAHA_API_KEY || ''
                }
            });
            console.log("QR Response:", qrResponse, qrResponse.body);
            if (!qrResponse.ok) {
                const errorData = await qrResponse.json().catch(() => ({}));
                return NextResponse.json({ message: errorData.message || 'Failed to get session qr' }, { status: 500 });
            }
            const qrData = await qrResponse.json();
            sessionWA.qr = {
                ...qrData,
                qr_link: `data:${qrData.mimetype};base64,${qrData.data}`
            }
        }
        

        /*
        const folder = await createFolder({
            name,
            workspaceId,
            isShared: 1,
            parentFolderId: parentFolderId || null,
            isStarred: 1,
            meta: meta ? JSON.stringify({
                ...meta,
                session:{
                    display_name: "default",
                    state: "disconnected",              
                    id: `${meta.waNumber}@c.us`,
                    jid: `${meta.waNumber}@s.whatsapp.net`,                 
                }                          
            }) : null
        });
        */
        return NextResponse.json(sessionWA, { status: 201 });
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
    const deviceResponse = await fetch(`${process.env.WAHA_API_URL}/api/sessions/${sessionName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.WAHA_API_KEY || ''
        }
    });
    
    const deviceData = await deviceResponse.json();   
    console.log("Check Session:", JSON.stringify(deviceData, null, 2));

    if (!deviceResponse.ok) {
        const errorData = await deviceResponse.json().catch(() => ({}));
        return NextResponse.json({ message: errorData.message || 'Failed to get device' }, { status: 500 });
    }
    return NextResponse.json(deviceData, { status: 200 });
}