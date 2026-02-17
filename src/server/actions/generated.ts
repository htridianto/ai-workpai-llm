import { auth } from '@/server/lib/auth';
import { prisma } from '@/server/lib/db';
import { uploadFile, deleteFile, getFileUrl } from '@/server/lib/minio';
import { GeneratedFile, GeneratedFolder } from '@/shared/types/types';
import { v4 as uuidv4 } from 'uuid';

export const mapGeneratedFolder = (f: any): GeneratedFolder => ({
  id: f.id,
  name: f.name,
  parentId: f.parentFolderId || undefined,
  dateCreated: f.createdAt.getTime(),
  isStarred: f.isStarred === 1,
  isShared: f.isShared === 1,
  isTrashed: f.deletedAt !== null,
});

export const mapGeneratedFile = (f: any): GeneratedFile => {
  const meta = f.meta ? JSON.parse(f.meta) : {};
  return {
    id: f.id,
    name: f.name,
    type: f.type as any,
    size: f.size,
    snippet: f.snippet || undefined,
    folderId: f.folderId || undefined,
    isStarred: f.isStarred === 1,
    isShared: f.isShared === 1,
    isTrashed: f.deletedAt !== null,
    ownerId: f.ownerId,
    sharedWith: f.shares?.map((s: any) => s.userId) || [],
    dateCreated: f.createdAt.getTime(),
    meta: meta,
  };
};

export async function getGeneratedFiles(includeTrashed = false) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const files = await prisma.generatedFile.findMany({
    where: {
      deletedAt: includeTrashed ? { not: null } : null,
      OR: [
        { ownerId: session.user.id },
        { shares: { some: { userId: session.user.id } } }
      ]
    },
    include: {
      shares: true
    },
    orderBy: { createdAt: 'desc' },
  });

  return files.map(mapGeneratedFile);
}

export async function getGeneratedFolders(includeTrashed = false) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const folders = await prisma.generatedFolder.findMany({
    where: {
      ownerId: session.user.id,
      deletedAt: includeTrashed ? { not: null } : null,
    },
    orderBy: { createdAt: 'desc' },
  });

  return folders.map(mapGeneratedFolder);
}

export async function createGeneratedFolder(name: string, parentId?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const folder = await prisma.generatedFolder.create({
    data: {
      name,
      ownerId: session.user.id,
      parentFolderId: parentId || null,
    },
  });

  return mapGeneratedFolder(folder);
}

export async function deleteGeneratedFolder(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const folder = await prisma.generatedFolder.findUnique({
    where: { id },
  });

  if (!folder || folder.ownerId !== session.user.id) throw new Error('Unauthorized');

  if (folder.deletedAt) {
    // Permanent delete
    return await prisma.generatedFolder.delete({
      where: { id },
    });
  } else {
    // Soft delete
    return await prisma.generatedFolder.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

const sanitizeUsernameToFolderName = (username: string) => {
  return username
    .toLowerCase()                   // Rule: Lowercase only
    .trim()                          // Rule: No leading/trailing spaces
    .replace(/\s+/g, '_')            // Rule: Replace internal spaces with underscores
    .replace(/[^a-z0-9_-]/g, '_');  // Rule: Replace @ and other symbols with underscores
}

export async function uploadGeneratedFile(file: File, folderId?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileId = uuidv4();
  const fileExtension = file.name.split('.').pop();
  const minioFileName = `${sanitizeUsernameToFolderName(session.user?.userName || session.user?.id || '')}/${fileId}.${fileExtension}`;

  await uploadFile(minioFileName, buffer, {
    'Content-Type': file.type,
    'Original-Name': file.name,
    'Owner-Id': session.user.id,
  });

  const generatedFile = await prisma.generatedFile.create({
    data: {
      id: fileId,
      name: file.name,
      type: fileExtension || 'unknown',
      size: file.size,
      ownerId: session.user.id,
      folderId: folderId || null,
      meta: JSON.stringify({ minioPath: minioFileName }),
    },
    include: {
      shares: true
    }
  });

  return mapGeneratedFile(generatedFile);
}

export async function createGeneratedFileFromContent(name: string, content: string, format: string, folderId?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const buffer = Buffer.from(content, 'utf-8');
  const fileId = uuidv4();
  
  // Map format to correct extension
  let extension = format;
  let contentType = 'text/plain';
  let action: string | null = null;

  switch (format) {
    case 'pdf': extension = 'pdf'; action = 'pdf'; contentType = 'application/pdf'; break;
    case 'docx': extension = 'docx'; action = 'docx'; contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break;
    case 'notes': extension = 'txt'; action = 'generate-notes'; contentType = 'text/plain'; break;
    case 'sheets': extension = 'xlsx'; action = 'xlsx'; contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; break;
    case 'slides': extension = 'pptx'; action = 'ppt'; contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; break;
    case 'image': extension = 'png'; action = 'image'; contentType = 'image/png'; break;
    case 'audio': extension = 'mp3'; action = 'text2speech'; contentType = 'audio/mpeg'; break;
    case 'video': extension = 'mp4'; contentType = 'video/mp4'; break;
    default: extension = 'txt'; action = 'generate-notes'; contentType = 'text/plain'; break;
  }

  const fileName = name.endsWith(`.${extension}`) ? name : `${name}.${extension}`;
  const minioFileName = `${sanitizeUsernameToFolderName(session.user?.userName || session.user?.id || '')}/${fileId}.${extension}`;

  if(action == 'generate-notes'){
    await uploadFile(minioFileName, buffer, {
      'Content-Type': contentType,
      'Original-Name': fileName,
      'Owner-Id': session.user.userName,
    });

    const generatedFile = await prisma.generatedFile.create({
      data: {
        id: fileId,
        name: fileName,
        type: format, // Store the original format identifier
        size: buffer.length,
        ownerId: session.user.id,
        folderId: folderId || null,
        snippet: content.slice(0, 200),
        meta: JSON.stringify({ minioPath: minioFileName }),
      },
      include: {
        shares: true
      }
    });

    return mapGeneratedFile(generatedFile);
  } else if(action){
    /* 
    do send to generate file to 'http://178.128.215.87:5000/api/v2/generate/{action}',
    output from api:
    {
      "id": "0171bf65-ca1e-4389-98be-c9e8db55f3e3",
      "path": "/app_data/downloads/20260217_081750_0171bf.pdf",
      "url_path": "http://178.128.215.87:5000/app_data/downloads/20260217_081750_0171bf.pdf"
    },
    get file content from response url_path , then the file upload to minio
    */
   try {
      const response = await fetch(`${process.env.GENERATED_CONTENT_URL}/api/v2/generate/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content }),
      });
      const data = await response.json();
      const fileBuffer = await fetch(data.url_path).then(res => res.arrayBuffer());
      await uploadFile(minioFileName, Buffer.from(fileBuffer), {
        'Content-Type': contentType,
        'Original-Name': fileName,
        'Owner-Id': session.user.userName,
      });
      const generatedFile = await prisma.generatedFile.create({
        data: {
          id: fileId,
          name: fileName,
          type: format, // Store the original format identifier
          size: fileBuffer.byteLength,
          ownerId: session.user.id,
          folderId: folderId || null,
          snippet: content.slice(0, 200),
          meta: JSON.stringify({ minioPath: minioFileName }),
        },
        include: {
          shares: true
        }
      });
      return mapGeneratedFile(generatedFile);   
   } catch (error) {
    console.log(error);
    throw new Error('Failed to generate file');
   }
  }  
}

export async function shareGeneratedFile(fileId: string, userIds: string[]) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  // Verify ownership
  const file = await prisma.generatedFile.findUnique({
    where: { id: fileId }
  });

  if (!file || file.ownerId !== session.user.id) throw new Error('Unauthorized');

  // Perform sharing in a transaction
  await prisma.$transaction(async (tx) => {
    // We use upsert for each user to ensure they have access without duplicates
    // skipDuplicates: true is not supported on all Prisma providers/adapters (like LibSQL)
    for (const uid of userIds) {
      await tx.generatedFileShare.upsert({
        where: {
          fileId_userId: {
            fileId: fileId,
            userId: uid
          }
        },
        create: {
          fileId: fileId,
          userId: uid
        },
        update: {}
      });
    }

    // Update isShared flag
    if (userIds.length > 0) {
      await tx.generatedFile.update({
        where: { id: fileId },
        data: { isShared: 1 }
      });
    }
  });

  return true;
}
