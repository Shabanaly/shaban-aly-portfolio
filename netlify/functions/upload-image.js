import { v2 as cloudinary } from "cloudinary";
import { Pool } from "pg";

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DB setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// MULTIPART PARSER — FULL BINARY SAFE
function parseMultipartForm(event) {
  const contentType =
    event.headers["content-type"] || event.headers["Content-Type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    throw new Error("Invalid multipart form-data");
  }

  const boundaryKey = "boundary=";
  const boundary = "--" + contentType.substring(
    contentType.indexOf(boundaryKey) + boundaryKey.length
  );

  // Convert Netlify body to binary buffer
  const bodyBuffer = Buffer.from(
    event.body,
    event.isBase64Encoded ? "base64" : "utf8"
  );

  const parts = [];
  let start = bodyBuffer.indexOf(boundary);

  while (start !== -1) {
    const end = bodyBuffer.indexOf(boundary, start + boundary.length);
    if (end === -1) break;

    const part = bodyBuffer.slice(start + boundary.length, end);
    parts.push(part);
    start = end;
  }

  for (const part of parts) {
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;

    const header = part.slice(0, headerEnd).toString();
    const content = part.slice(headerEnd + 4).slice(0, -2); // remove ending CRLF

    if (header.includes("filename=")) {
      const match = header.match(/filename="([^"]+)"/);
      const filename = match ? match[1] : `image-${Date.now()}`;
      return { fileBuffer: content, filename };
    }
  }

  return { fileBuffer: null, filename: null };
}

// Upload to Cloudinary
function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        type: "upload",
        folder: "projects",
        public_id: `${Date.now()}`,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );

    upload.end(buffer);
  });
}

export async function handler(event) {
  // CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { fileBuffer, filename } = parseMultipartForm(event);

    if (!fileBuffer) {
      throw new Error("No image file detected");
    }

    const uploadResult = await uploadToCloudinary(fileBuffer, filename);

    const client = await pool.connect();
    await client.query(
      "INSERT INTO images (url, filename, created_at) VALUES ($1, $2, NOW())",
      [uploadResult.secure_url, filename]
    );
    client.release();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        success: true,
        url: uploadResult.secure_url,
      }),
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
