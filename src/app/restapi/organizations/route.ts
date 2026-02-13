
import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createOrganization, listOrganizations } from '@/server/models/organization';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orgs = await listOrganizations();
    return NextResponse.json(orgs);
  } catch (error) {
    console.error('GET Organizations error:', error);
    return NextResponse.json({ message: 'Failed to fetch organizations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const org = await createOrganization(body);
    return NextResponse.json(org, { status: 201 });
  } catch (error) {
    console.error('POST Organization error:', error);
    return NextResponse.json({ message: 'Failed to create organization' }, { status: 500 });
  }
}
