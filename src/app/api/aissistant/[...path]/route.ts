import { auth } from '@/server/lib/auth';
import { NextResponse } from 'next/server';

export async function ALL(request, { params }) {
    const session = await auth();
    // console.log('PROXY:session:', JSON.stringify(session, null, 2));
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }    
   
    const { path } = await params;
    const fullPath = path.join('/').replace('api/aissistant/', '');
    const targetUrl = `${process.env.AISSISTANT_API_URL}/api/v1/${fullPath}`;
    
    // 1. Capture Query Strings
    const searchParams = request.nextUrl.searchParams.toString();
    const finalUrl = searchParams ? `${targetUrl}?${searchParams}` : targetUrl;

    // 2. Clone the Request Body (must clone to avoid stream consumption)
    const isMultipart = (request.headers.get('content-type') || '').includes('multipart/form-data');
    let bodyText = isMultipart ? 'multipart/form-data' : await request.text();
    
    // --- DEBUG LOGGING: REQUEST ---
    console.log("--- PROXY DEBUG: REQUEST ---");
    console.log(`URL: ${finalUrl}`);
    console.log(`Method: ${request.method}`);
    console.log(`Headers:`, Object.fromEntries(request.headers));
    console.log(`Body:`, bodyText);
    // ------------------------------

    try {
        const bodyContext = {
            method: request.method,
            headers: {
                ...Object.fromEntries(request.headers),
                'host': process.env.AISSISTANT_API_URL || 'http://localhost:8080', // Override host for the target
                'Authorization': `Bearer ${session.accessToken}`
            },
            body: request.method !== 'GET' ? (isMultipart ? request.body : bodyText) : undefined,
            duplex: 'half' // PENTING untuk upload file besar agar tidak timeout
        }      

        const response = await fetch(finalUrl, bodyContext);

        let responseData = isMultipart ? 'multipart/form-data' : await response.text();

        // --- DEBUG LOGGING: RESPONSE ---
        console.log("--- PROXY DEBUG: RESPONSE ---");
        console.log(`Status: ${response.status}`);
        console.log(`Response Body:`, responseData);
        // -------------------------------

        // Return the response to the client with a custom Debug Header
        return new NextResponse( isMultipart ? response.body : responseData, {
            status: response.status,
            headers: {
                ...Object.fromEntries(response.headers),
                'X-Proxy-Debug': 'Active', // Your debug header
            },
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: 'Proxy failed' }, { status: 502 });
    }
}

// Export for all HTTP methods
export const GET = ALL;
export const POST = ALL;
export const PATCH = ALL;
export const PUT = ALL;
export const DELETE = ALL;