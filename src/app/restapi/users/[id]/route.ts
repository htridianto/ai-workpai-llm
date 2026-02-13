import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/server/models/user';
import { auth } from '@/server/lib/auth';
import { deleteOrganization } from '@/server/models';

/**
 * GET /restapi/users/[id]
 * Get user by ID
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { credential, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('[USER_GET]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * PATCH /restapi/users/[id]
 * Update user by ID
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const existingUser = await getUserById(id);

    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Basic permission check (allow only self or admin/manager role potentially)
    // For now, simple update logic
    const updated = await updateUser(id, body);
    const { credential, ...safeUser } = updated;
    
    return NextResponse.json(safeUser);
  } catch (error: any) {
    console.error('[USER_PATCH]', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Email or username already in use' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }
}

/**
 * DELETE /restapi/users/[id]
 * Soft delete user
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await deleteUser(id);
    // delete organization
    await deleteOrganization(id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('[USER_DELETE]', error);
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}
