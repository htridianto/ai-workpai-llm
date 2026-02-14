import { NextResponse } from 'next/server';
import { getGeneratedFolders, createGeneratedFolder, deleteGeneratedFolder } from '@/server/actions/generated';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeTrashed = searchParams.get('includeTrashed') === 'true';
    const folders = await getGeneratedFolders(includeTrashed);
    return NextResponse.json(folders);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, parentId } = body;
    const folder = await createGeneratedFolder(name, parentId);
    return NextResponse.json(folder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });
    
    await deleteGeneratedFolder(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}
