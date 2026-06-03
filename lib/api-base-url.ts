function normalizeBaseUrl(url: string | undefined): string {
  return (url || '').replace(/\/+$/, "");
}

export function getApiBaseUrl(): string {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
}

export function buildBackendUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();
  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
}
