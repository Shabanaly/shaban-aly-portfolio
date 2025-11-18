// Admin Configuration
// ⚠️ CHANGE THIS BEFORE DEPLOYMENT!
// Set this as an environment variable ADMIN_PASSWORD in Netlify instead of hardcoding it.

export const ADMIN_CONFIG = {
  // Default password (CHANGE THIS IMMEDIATELY after deploying)
  PASSWORD: 'shaban123',
  
  // API base URL
  // For local development: 'http://localhost:8888/.netlify/functions'
  // For production: leave empty to use relative paths
  API_BASE: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:8888/.netlify/functions'
    : '/.netlify/functions',
};

export const API_ENDPOINTS = {
  UPLOAD_IMAGE: `${ADMIN_CONFIG.API_BASE}/upload-image`,
  GET_PROJECTS: `${ADMIN_CONFIG.API_BASE}/projects-crud?method=GET`,
  ADD_PROJECT: `${ADMIN_CONFIG.API_BASE}/projects-crud?method=POST`,
  DELETE_PROJECT: `${ADMIN_CONFIG.API_BASE}/projects-crud?method=DELETE`,
};
