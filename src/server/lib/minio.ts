import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '7000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'rag-llm',
  secretKey: process.env.MINIO_SECRET_KEY || 'wRMeraVvXplcf7LrXWd8Gn88rdiT5SCC',
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'rag-llm';

export const ensureBucketExists = async () => {
  const exists = await minioClient.bucketExists(BUCKET_NAME);
  if (!exists) {
    await minioClient.makeBucket(BUCKET_NAME);
  }
};

export const uploadFile = async (fileName: string, buffer: Buffer, metadata: any = {}) => {
  await ensureBucketExists();
  return await minioClient.putObject(BUCKET_NAME, fileName, buffer, metadata);
};

export const getFileUrl = async (fileName: string) => {
  return await minioClient.presignedGetObject(BUCKET_NAME, fileName, 24 * 60 * 60); // 24 hours
};

export const deleteFile = async (fileName: string) => {
  return await minioClient.removeObject(BUCKET_NAME, fileName);
};

export { minioClient };
