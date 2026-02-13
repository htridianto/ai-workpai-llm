
import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { getOrganizationById, updateOrganization, deleteOrganization } from '@/server/models/organization';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const org = await getOrganizationById(orgId);
    if (!org) {
      return NextResponse.json({ message: 'Organization not found' }, { status: 404 });
    }
    return NextResponse.json(org);
  } catch (error) {
    console.error('GET Organization error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateOrganization(orgId, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH Organization error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deleteOrganization(orgId, true);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('DELETE Organization error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

