import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please enter both email and password.' },
        { status: 400 }
      );
    }

    // Simulate database lookup latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Valid credentials check
    if (email === 'admin@local.host' && password === 'password') {
      const token = 'mock-jwt-token-xyz-123-signed-securely';
      
      return NextResponse.json({
        success: true,
        token,
        user: {
          id: 'u-admin',
          name: 'Admin User',
          email: 'admin@local.host',
          role: 'admin',
          avatar: '/avatars/admin.png'
        }
      });
    }

    return NextResponse.json(
      { message: 'Invalid email or password.' },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred during login.' },
      { status: 500 }
    );
  }
}
