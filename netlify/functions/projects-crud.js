import { Pool } from 'pg';

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
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  const method = event.queryStringParameters?.method || event.httpMethod;

  try {
    if (method === 'GET') {
      return await handleGet();
    } else if (method === 'POST') {
      return await handlePost(event);
    } else if (method === 'DELETE') {
      return await handleDelete(event);
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }
  } catch (error) {
    console.error('CRUD error:', error);
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

// GET all projects
async function handleGet() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, title, description, image, link, created_at FROM projects ORDER BY created_at DESC'
    );

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        projects: result.rows,
      }),
    };
  } finally {
    client.release();
  }
}

// POST add project
async function handlePost(event) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: 'Invalid JSON' }),
    };
  }

  const { title, description, image, link } = body;

  if (!title || !description || !image) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: false,
        error: 'Missing required fields: title, description, image',
      }),
    };
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO projects (title, description, image, link, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
      [title, description, image, link || null]
    );

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        projectId: result.rows[0].id,
      }),
    };
  } finally {
    client.release();
  }
}

// DELETE project
async function handleDelete(event) {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: 'Missing project id' }),
    };
  }

  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM projects WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: false, error: 'Project not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Project deleted',
      }),
    };
  } finally {
    client.release();
  }
}
