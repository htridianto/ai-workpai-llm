import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Simulate OAuth handshake latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const token = 'mock-google-oauth-token-secure-abc-789';
    
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: 'u-google-123',
        name: 'Google User',
        email: 'user@gmail.com',
        role: 'user',
        avatar: 'https://lh3.googleusercontent.com/a/default-user'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Google authentication failed.' },
      { status: 500 }
    );
  }
}
