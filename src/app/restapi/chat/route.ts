import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const ragApiUrl = process.env.RAG_API_URL;
    const ragApiKey = process.env.RAG_API_KEY;

    if (!ragApiUrl || !ragApiKey) {
        return NextResponse.json(
            { message: 'RAG API configuration missing' },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        const { 
            workspaceSlug, 
            threadSlug, 
            message, 
            mode, 
            attachments, 
            reset 
        } = body;

        if (!workspaceSlug || !threadSlug) {
            return NextResponse.json(
                { message: 'workspaceSlug and threadSlug are required' },
                { status: 400 }
            );
        }

        // According to AnythingLLM API: POST /v1/workspace/{slug}/thread/{threadSlug}/stream-chat        
        const targetUrl = `${ragApiUrl}/api/v1/workspace/${workspaceSlug}/thread/${threadSlug}/stream-chat`;
        const payload = {
            message,
            mode: mode || 'chat',
            userId: session.user.ssoAuthId,
            attachments,
            reset: reset || false
        };
        console.log('payload', JSON.stringify(payload));
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ragApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { message: errorData.error || 'Failed to fetch stream chat from RAG API' },
                { status: response.status }
            );
        }

        if (!response.body) {
            return NextResponse.json(
                { message: 'No response body from RAG API' },
                { status: 500 }
            );
        }

        // Parse the stream from RAG API and only send the textResponse parts to the client
        const reader = response.body.getReader();
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let buffer = '';

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });
                        // Attempt to parse any complete JSON objects in the buffer
                        // AnythingLLM chunks are often individual JSON objects
                        // but sometimes they might be sent together or split.
                        // A simple way to handle this is to look for }{ or \n if they are newline-separated.
                        // But since it's a stream of JSON objects, let's try a more robust approach.
                        
                        let start = 0;
                        let depth = 0;
                        for (let i = 0; i < buffer.length; i++) {
                            if (buffer[i] === '{') depth++;
                            else if (buffer[i] === '}') {
                                depth--;
                                if (depth === 0) {
                                    let jsonStr = buffer.substring(start, i + 1);
                                    console.log('jsonStr', jsonStr);

                                    // Remove 'data: ' prefix if present
                                    if (jsonStr.trim().startsWith('data: ')) {
                                        jsonStr = jsonStr.replace('data: ', '').trim();
                                    }

                                    try {
                                        const json = JSON.parse(jsonStr);
                                        // Enqueue the entire JSON string so the client can parse metadata
                                        controller.enqueue(encoder.encode(jsonStr + '\n'));
                                    } catch (e) {
                                        console.error('Error parsing JSON chunk:', e);
                                    }
                                    start = i + 1;
                                }
                            }
                        }
                        buffer = buffer.substring(start);
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });


    } catch (error: any) {
        console.error('Error in chat route:', error);
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

