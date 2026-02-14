import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { prisma } from '@/server/lib/db';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

  const file = await prisma.generatedFile.findUnique({ where: { id } });
  if (!file || file.ownerId !== session.user.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await prisma.generatedFile.update({
    where: { id },
    data: { deletedAt: null }
  });

  return NextResponse.json({ success: true });
}
