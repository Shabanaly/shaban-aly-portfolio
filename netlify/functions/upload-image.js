import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';
import { Readable } from 'stream';

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
  // Handle CORS preflight
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

  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Parse multipart form data
    const { file, filename } = await parseMultipart(event);

    if (!file) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file uploaded' }),
      };
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, filename);

    if (!uploadResult.secure_url) {
      throw new Error('Upload failed');
    }

    // Save to database
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO images (url, filename, created_at) VALUES ($1, $2, NOW())',
        [uploadResult.secure_url, filename]
      );
    } finally {
      client.release();
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
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

// Parse multipart form data
async function parseMultipart(event) {
  const contentType = event.headers['content-type'] || '';

  if (!contentType.includes('multipart/form-data')) {
    throw new Error('Invalid content type');
  }

  const boundary = contentType.split('boundary=')[1];
  const body = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');

  let file = null;
  let filename = 'image.jpg';

  const parts = body.toString('utf8').split(`--${boundary}`);

  for (const part of parts) {
    if (part.includes('filename=')) {
      const filenameMatch = part.match(/filename="([^"]+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }

      const fileStart = part.indexOf('\r\n\r\n') + 4;
      const fileEnd = part.lastIndexOf('\r\n');
      file = body.slice(
        body.indexOf(part) + fileStart,
        body.indexOf(part) + fileEnd
      );
      break;
    }
  }

  return { file, filename };
}

// Upload to Cloudinary using buffer
function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: `portfolio/${Date.now()}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
}
