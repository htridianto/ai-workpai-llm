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
        const { name, workspaceId, parentFolderId } = body;

        if (!name || !workspaceId) {
            return NextResponse.json({ message: 'Name and Workspace ID are required' }, { status: 400 });
        }

        if (await isFolderNameDuplicate(workspaceId, name, parentFolderId)) {
            return NextResponse.json({ message: `Folder name "${name}" already exists in this workspace` }, { status: 400 });
        }

        const folder = await createFolder({
            name,
            workspaceId,
            isShared: 1,
            parentFolderId: parentFolderId || null,
        });

        return NextResponse.json(folder, { status: 201 });
    } catch (error) {
        console.error("POST Folder error:", JSON.stringify(error, null, 2));
        return NextResponse.json({ message: 'Failed to create folder' }, { status: 500 });
    }
}
