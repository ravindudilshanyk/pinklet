const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

export const API_BASE_URL = apiBaseUrl;
export const GOOGLE_CLIENT_ID = googleClientId;

export const apiUrl = (path) => {
  const normalizedBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
};