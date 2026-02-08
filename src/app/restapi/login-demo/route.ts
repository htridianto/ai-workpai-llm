import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Simulate provisioning latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const token = 'mock-demo-token-ephemeral-v1';
    
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: 'u-demo',
        name: 'Demo User',
        email: 'demo@workpai.ai',
        role: 'user',
        avatar: '/avatars/demo.png'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Demo provisioning failed.' },
      { status: 500 }
    );
  }
}
