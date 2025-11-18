import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';
import Busboy from 'busboy';

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { fileBuffer, filename } = await parseMultipart(event);

    if (!fileBuffer) {
      throw new Error("File not received properly");
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(fileBuffer, filename);

    // Save to Database
    const client = await pool.connect();
    await client.query(
      'INSERT INTO images (url, filename, created_at) VALUES ($1, $2, NOW())',
      [uploadResult.secure_url, filename]
    );
    client.release();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: true,
        url: uploadResult.secure_url,
      }),
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
}

// Proper multipart parser (fixes Invalid image file)
function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: event.headers,
    });

    let fileBuffer = null;
    let filename = 'image.jpg';

    busboy.on('file', (fieldname, file, info) => {
      filename = info.filename;
      const chunks = [];

      file.on('data', (chunk) => {
        chunks.push(chunk);
      });

      file.on('end', () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on('finish', () => {
      resolve({
        fileBuffer,
        filename,
      });
    });

    busboy.on('error', reject);

    busboy.end(event.body, event.isBase64Encoded ? "base64" : "utf8");
  });
}

// Upload to Cloudinary
function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        type: 'upload',
        folder: 'projects',
        public_id: `${Date.now()}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
}
