import { NextResponse } from 'next/server';
import { getGeneratedFiles, uploadGeneratedFile } from '@/server/actions/generated';
import { prisma } from '@/server/lib/db';
import { auth } from '@/server/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeTrashed = searchParams.get('includeTrashed') === 'true';
    const files = await getGeneratedFiles(includeTrashed);
    return NextResponse.json(files);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folderId = formData.get('folderId') as string;

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    const newFile = await uploadGeneratedFile(file, folderId);
    return NextResponse.json(newFile, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

  const file = await prisma.generatedFile.findUnique({ where: { id } });
  if (!file || file.ownerId !== session.user.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  if (file.deletedAt) {
    // Permanent delete
    const meta = file.meta ? JSON.parse(file.meta) : {};
    if (meta.minioPath) {
      try {
        const { deleteFile: minioDelete } = await import('@/server/lib/minio');
        await minioDelete(meta.minioPath);
      } catch (e) {
        console.error('Failed to delete from MinIO', e);
      }
    }
    await prisma.generatedFile.delete({ where: { id } });
  } else {
    // Soft delete
    await prisma.generatedFile.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  return NextResponse.json({ success: true });
}
