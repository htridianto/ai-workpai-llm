import { NextResponse } from 'next/server';
import { createGeneratedFileFromContent } from '@/server/actions/generated';
import { auth } from '@/server/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { content, format, name, folderId } = body;

    if (!content || !format) {
      return NextResponse.json({ message: 'Content and format are required' }, { status: 400 });
    }

    // Default name if not provided
    const fileName = name || `Generated_${format.toUpperCase()}_${Date.now()}`;

    const newFile = await createGeneratedFileFromContent(fileName, content, format, folderId);
    
    return NextResponse.json(newFile, { status: 201 });
  } catch (error: any) {
    console.error('Generation Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
