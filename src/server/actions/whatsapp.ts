import { uploadFile } from "@/server/lib/minio";
import { FileContext } from '@/shared/types/types'



/**
 * function to check wa session/device status
 * arguments: 
 * - sessionName: string
 */
export const checkWaSession = async (sessionName: string) => {
    try {
        // do check wa device
        const response = await fetch(`${process.env.WHATSAPP_API_URL}/devices/${sessionName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(process.env.WHATSAPP_API_KEY || '').toString('base64')}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { ok: false, message: errorData.message || 'Failed to get device' };
        }
        const data = await response.json();
        console.log("Check Session:", JSON.stringify(data, null, 2));
        if(data.code !== 'SUCCESS') {
            console.error("GET device failed:", data);
            return { ok: false, message: data.message || 'GET device failed' };
        }                
        return { ok: true, data };
    } catch (error) {
        console.error("GET device error:", error);
        return { ok: false, message: 'GET device error' };
    }
}


/**
 * function to get chats from whatsapp then store to minio as file text
 * arguments: 
 * - sessionName: string
 * - fileContext: FileContext
 */
export const processChats = async (sessionName: string, fileContext: FileContext) => {
    const params = new URLSearchParams({
        limit: '100',
        offset: '0'
    });
    if(fileContext.meta?.lastMessageTimestamp){
        params.set('start_time', fileContext.meta.lastMessageTimestamp); //start_time=2026-01-01T00:00:00
    }
    console.log("GET chats params:", sessionName, fileContext.meta?.waGroupId, params.toString());
    try {
        const response = await fetch(`${process.env.WHATSAPP_API_URL}/chat/${fileContext.meta?.waGroupId}/messages?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(process.env.WHATSAPP_API_KEY || '').toString('base64')}`,
                'X-Device-Id': encodeURIComponent(sessionName)
            },
        });

        const resp = await response.json();
        if(resp.code !== 'SUCCESS') {
            console.error("GET chats error:", resp);
            return null;
        }
        const data = resp.results.data;
        if(!data || data.length === 0) {
            return null;
        }

        const lastMessage = data[0];
        const lastMessageTimestamp = lastMessage.timestamp;
        console.log("GET chats:", JSON.stringify(data, null, 2));
        // do create file text then upload to minio
        const chatText = JSON.stringify(data, null, 2);
        const buffer = Buffer.from(chatText);
        const minioFileName = `.source/whatsapp/${sessionName}/${fileContext.meta?.waGroupId}.txt`;
        const minioResponse = await uploadFile(minioFileName, buffer, {
            'Content-Type': 'text/plain',
            'Original-Name': fileContext.meta?.waGroupId,
            'Owner-Id': sessionName,
        });
        console.log("Minio upload details:", minioResponse);
        return {
            data,
            lastMessage,
            lastMessageTimestamp,
            size: buffer.length,
            storage: {...minioResponse, location: minioFileName}
        };
    } catch (error) {
        console.error("GET chats error:", error);
        return null;
    }
}