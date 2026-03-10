import { NextResponse } from 'next/server';
import { listUsers, createUser } from '@/server/models/user';
import { auth } from '@/server/lib/auth';
/**
 * GET /restapi/users
 * List all users (Requires Admin/Manager role eventually)
 */
export async function GET(req: Request) {
  const session = await auth();
  // console.log('restapi/users::GET session:', JSON.stringify(session, null, 2));
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await listUsers();
    // Strip sensitive data before returning
    const safeUsers = users.map(({ credential, ...rest }) => rest);
    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error('[USERS_GET]', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

/**
 * POST /restapi/users
 * Create a new user
 */
export async function POST(req: Request) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, name, role, userName, bio } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const newUser = await createUser({
      email,
      name,
      role: role || 'default',
      userName,
      bio
    });

    const { credential, ...safeUser } = newUser;
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error: any) {
    console.error('[USERS_POST]', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'User with this email or username already exists' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
