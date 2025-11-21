/// src/environments/environment.ts

const API_HOST = 'http://127.0.0.1:8000';
const API_BASE = `${API_HOST}/api`;
const PIGAPP_BASE = `${API_BASE}/pigapp_app`;
const PIGAPP_API_BASE = `${PIGAPP_BASE}/api`;

export const environment = {
  production: false,

  // Az ApiEndpoints által használt mezők
  API_HOST,
  API_BASE,
  PIGAPP_BASE,
  PIGAPP_API_BASE,
};
