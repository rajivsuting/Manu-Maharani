import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
      ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  },
});

const bucketName = process.env.GCP_BUCKET_NAME!;
const bucket = storage.bucket(bucketName);

export { storage, bucket };

export function toObjectNameFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\/+/, "");
    const segments = path.split("/");
    
    if (segments[0] === bucketName) {
      return segments.slice(1).join("/");
    }
    
    return segments.join("/");
  } catch {
    const i = url.indexOf("uploads/");
    return i >= 0 ? url.slice(i) : url;
  }
}

export async function deleteFilesFromGCS(urls: string[]): Promise<void> {
  const deletePromises = urls.map((url) => {
    const objectName = toObjectNameFromUrl(url);
    return bucket.file(objectName).delete().catch((err) => {
      console.error(`Failed to delete ${objectName}:`, err);
    });
  });

  await Promise.allSettled(deletePromises);
}

export async function deleteFileFromGCS(url: string): Promise<void> {
  try {
    const objectName = toObjectNameFromUrl(url);
    await bucket.file(objectName).delete();
  } catch (err) {
    console.error(`Failed to delete file from GCS:`, err);
  }
}

export async function generateSignedUploadUrl(
  filename: string,
  contentType: string
): Promise<{ signedUrl: string; publicUrl: string }> {
  const objectName = `uploads/${Date.now()}-${filename}`;
  const file = bucket.file(objectName);

  const [signedUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType,
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${objectName}`;

  return { signedUrl, publicUrl };
}

export async function uploadFileToGCS(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const objectName = `uploads/${Date.now()}-${filename}`;
  const file = bucket.file(objectName);

  await file.save(buffer, {
    contentType,
    public: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return `https://storage.googleapis.com/${bucketName}/${objectName}`;
}

