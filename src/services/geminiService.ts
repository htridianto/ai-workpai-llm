import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, Role, Attachment } from '../types';

let genAIInstance: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is missing.");
    }
    genAIInstance = new GoogleGenAI({ apiKey });
  }
  return genAIInstance;
};

export const streamChatResponse = async (
  modelId: string,
  history: Message[],
  newMessage: string,
  attachments: Attachment[],
  systemInstruction: string,
  onChunk: (text: string) => void
): Promise<string> => {
  const ai = getGenAI();

  // Construct history for the chat API
  // Note: We filter out failed messages or pure error states before sending
  const chatHistory = history
    .filter(msg => !msg.isError && msg.role !== Role.SYSTEM) // System instruction is passed separately
    .map(msg => {
      const parts: any[] = [];
      if (msg.attachments && msg.attachments.length > 0) {
        msg.attachments.forEach(att => {
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
        role: msg.role === Role.USER ? 'user' : 'model',
        parts: parts
      };
    });

  const chat = ai.chats.create({
    model: modelId,
    history: chatHistory,
    config: {
      systemInstruction: systemInstruction,
    }
  });

  // Prepare current message content
  const currentMessageParts: any[] = [];
  attachments.forEach(att => {
    currentMessageParts.push({
      inlineData: {
        mimeType: att.mimeType,
        data: att.data
      }
    });
  });
  currentMessageParts.push({ text: newMessage });

  // If we have attachments, we must pass 'contents' structure to sendMessageStream differently if using the generic generateContent,
  // but chat.sendMessageStream handles mixed content fine as a list of parts or a string.
  
  // The SDK signature for sendMessageStream accepts `string | Part[] | ...`
  // We'll wrap it in the expected format.
  const messagePayload = currentMessageParts.length === 1 && currentMessageParts[0].text 
    ? currentMessageParts[0].text 
    : currentMessageParts;

  try {
    const resultStream = await chat.sendMessageStream({ message: messagePayload });
    
    let fullText = '';
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        fullText += c.text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
