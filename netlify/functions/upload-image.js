import { v2 as cloudinary } from "cloudinary";
import { Pool } from "pg";

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ------------------------------
// Multipart Form Parser (بدون مكتبات)
// ------------------------------
function parseMultipartForm(event) {
  const contentType =
    event.headers["content-type"] || event.headers["Content-Type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    throw new Error("Invalid Content-Type, expected multipart/form-data");
  }

  const boundary = "--" + contentType.split("boundary=")[1];
  const body = Buffer.from(
    event.body,
    event.isBase64Encoded ? "base64" : "binary"
  );

  const parts = body.split(Buffer.from(boundary));

  for (let part of parts) {
    if (part.includes("filename=")) {
      const start = part.indexOf("\r\n\r\n") + 4;
      const end = part.lastIndexOf("\r\n");

      const fileBuffer = part.slice(start, end);

      const filenameMatch =
        part.toString().match(/filename="([^"]+)"/) ||
        part.toString().match(/filename=(.+)/);
      const filename = filenameMatch
        ? filenameMatch[1].replace(/"/g, "")
        : `image-${Date.now()}.jpg`;

      return { fileBuffer, filename };
    }
  }

  return { fileBuffer: null, filename: null };
}

// ------------------------------
// Upload to Cloudinary
// ------------------------------
function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        type: "upload",
        folder: "projects",
        public_id: `${Date.now()}`,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

// ------------------------------
// Main Handler
// ------------------------------
export async function handler(event) {
  // Handle CORS
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
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Parse image from request
    const { fileBuffer, filename } = parseMultipartForm(event);

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("Invalid image file");
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(fileBuffer, filename);

    // Save to database
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
  } catch (err) {
    console.error("Upload error:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        success: false,
        error: err.message,
      }),
    };
  }
}
