import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { prisma } from '@/server/lib/db';
import { getFileUrl } from '@/server/lib/minio';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

  const file = await prisma.generatedFile.findUnique({ where: { id } });
  if (!file || file.ownerId !== session.user.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const meta = file.meta ? JSON.parse(file.meta) : {};
  const minioPath = meta.minioPath;

  if (!minioPath) {
    return NextResponse.json({ message: 'MinIO path not found' }, { status: 404 });
  }

  const url = await getFileUrl(minioPath);
  return NextResponse.json({ url });
}
