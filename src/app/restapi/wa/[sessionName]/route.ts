import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createFolder, getFolderById, isFolderNameDuplicate, updateFolder } from '@/server/models';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ sessionName: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    } 
    const { searchParams } = new URL(req.url);
    const reload = searchParams.get('reload');
    const folderId = (await params).sessionName;
    const folder = await getFolderById(folderId);    
    if (!folder) {
        return NextResponse.json({ message: 'WA Session not found' }, { status: 404 });
    }
    if(!reload && folder.meta?.groups) {
        return NextResponse.json({ data:folder.meta.groups }, { status: 200 });
    }

    // do fetch /whatsapp/user/my/groups
    const sessionName = folder.meta.session.id;
    const response = await fetch(`${process.env.WHATSAPP_API_URL}/user/my/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(process.env.WHATSAPP_API_KEY || '').toString('base64')}`,
            'X-Device-Id': encodeURIComponent(sessionName)
        }
    });
    if(!response.ok) {
        return NextResponse.json({ message: 'Failed to get WA groups' }, { status: 500 });
    }    
    const responseData = await response.json();
    console.log("GET WA groups:", JSON.stringify(responseData, null, 2));
        
    const groups = responseData.results.data || [];
    if(groups && groups.length > 0) {
        groups.forEach((group: any) => {
            group.ParticipantCount = group.Participants.length;
            delete group.Participants;
        });
        await updateFolder(folderId, { meta: JSON.stringify({...folder.meta, groups}) });
    }

    return NextResponse.json({ data: groups }, { status: 200 });
}
