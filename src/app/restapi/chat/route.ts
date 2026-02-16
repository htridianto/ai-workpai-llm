import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API Key is defined
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Helper to transform our Message type to Gemini's Content type
// We'll duplicate the logic here since we want to isolate the SDK usage
function transformMessages(history: any[]) {
    return history
    .filter((msg: any) => !msg.isError && msg.role !== 'system') 
    .map((msg: any) => {
        const parts: any[] = [];
        if (msg.attachments && msg.attachments.length > 0) {
            msg.attachments.forEach((att: any) => {
                parts.push({
                    inlineData: {
                        mimeType: att.mimeType,
                        data: att.data
                    }
                });
            });
        }
        if (msg.text) {
            parts.push({ text: msg.text });
        }
        return {
            role: msg.role === 'user' ? 'user' : 'model',
            parts: parts
        };
    });
}

export async function POST(req: NextRequest) {
    if (!genAI) {
        return NextResponse.json({ message: "GEMINI_API_KEY is missing in server environment." }, { status: 500 });
    }

    try {
        const { modelId, history, newMessage, attachments, systemInstruction } = await req.json();

        const chatHistory = transformMessages(history || []);
        console.log("systemInstruction:", systemInstruction);
        const chat = genAI.chats.create({
            model: "gemini-1.5-flash",
            history: chatHistory,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        // Prepare current message content
        const currentMessageParts: any[] = [];
        if (attachments && Array.isArray(attachments)) {
            attachments.forEach((att: any) => {
                currentMessageParts.push({
                    inlineData: {
                        mimeType: att.mimeType,
                        data: att.data
                    }
                });
            });
        }
        currentMessageParts.push({ text: newMessage });

        const messagePayload = currentMessageParts.length === 1 && currentMessageParts[0].text 
            ? currentMessageParts[0].text 
            : currentMessageParts;

        const resultStream = await chat.sendMessageStream({ message: messagePayload });
        
        // Create a ReadableStream
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of resultStream) {
                        const c = chunk as GenerateContentResponse;
                        if (c.text) {
                            controller.enqueue(encoder.encode(c.text));
                        }
                    }
                    controller.close();
                } catch (err) {
                    console.error("Streaming error:", err);
                    controller.error(err);
                }
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });

    } catch (error: any) {
        console.error("Chat route error:", error);
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
