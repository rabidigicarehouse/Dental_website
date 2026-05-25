const DEFAULT_BACKEND_URL = "http://localhost:5000";

function normalizeBaseUrl(url: string | undefined): string {
  return (url || DEFAULT_BACKEND_URL).replace(/\/+$/, "");
}

export function getApiBaseUrl(): string {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
}

export function buildBackendUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
