import { NextResponse } from 'next/server';
import { shareGeneratedFile } from '@/server/actions/generated';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileId, userIds } = body;

    if (!fileId || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    await shareGeneratedFile(fileId, userIds);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === 'Unauthorized' ? 401 : 500 });
  }
}
