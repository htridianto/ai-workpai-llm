import { NextResponse } from 'next/server';

//@todo remove this endpoint
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

    // Real authentication against RAG_API_URL
    const ragApiUrl = process.env.RAG_API_URL;
    
    if (!ragApiUrl) {
        console.error("RAG_API_URL is not defined in environment variables.");
        return NextResponse.json(
            { message: 'Server configuration error.' },
            { status: 500 }
        );
    }
    const payload = { username: email, password };

    const authResponse = await fetch(`${ragApiUrl}/api/request-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    const authData = await authResponse.json();
    // console.log('authData', payload,JSON.stringify(authData, null, 2));

    if (!authResponse.ok || !authData.valid || !authData.user)  {
        return NextResponse.json(
            { message: authData.message || 'Invalid credentials.' },
            { status: 401 } // 401 = Unauthorized
        );
    }

    // Success - map the response to our user structure
    // Assuming authData returns { token, ... } or similar. Adjust based on actual API response if needed.
    // For now, we'll return the token and a user object derived from the input or response.
    return NextResponse.json({
        success: true,
        token: authData.token,
        user: {
            id: authData.user?.id || 'u-external', // Use ID from response or fallback
            name: authData.user?.display_name || authData.user?.username, // Use name from response or fallback
            email: authData.user?.email || email,
            role: authData.user?.role || 'user', // Default role
            bio: authData.user?.bio || '',
            avatar: '/avatars/admin.png' // Default avatar
        }
    });  
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: 'An error occurred during login.' },
      { status: 500 }
    );
  }
}
