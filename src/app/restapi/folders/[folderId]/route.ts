import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { updateFolder, deleteFolder, getFolderById, isFolderNameDuplicate } from '@/server/models';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ folderId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { folderId } = await params;

    try {
        const body = await req.json();
        const { name } = body;
        if (name) {
            const folder = await getFolderById(folderId);
            if (!folder) {
                return NextResponse.json({ message: 'Folder not found' }, { status: 404 });
            }
            
            if (await isFolderNameDuplicate(folder.workspaceId, name, folder.parentId || null, folderId)) {
                return NextResponse.json({ message: `Folder name "${name}" already exists in this workspace` }, { status: 400 });
            }
        }

        const updatedFolder = await updateFolder(folderId, body);
        return NextResponse.json(updatedFolder);
    } catch (error) {
        console.error("PATCH Folder error:", error);
        return NextResponse.json({ message: 'Failed to update folder' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ folderId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { folderId } = await params;

    try {
        await deleteFolder(folderId, true);
        return NextResponse.json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.error("DELETE Folder error:", error);
        return NextResponse.json({ message: 'Failed to delete folder' }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ folderId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { folderId } = await params;

    try {
        const folder = await getFolderById(folderId);
        if (!folder) {
            return NextResponse.json({ message: 'Folder not found' }, { status: 404 });
        }
        return NextResponse.json(folder);
    } catch (error) {
        console.error("GET Folder error:", error);
        return NextResponse.json({ message: 'Failed to fetch folder' }, { status: 500 });
    }
}
