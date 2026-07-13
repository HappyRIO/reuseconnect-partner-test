function required(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value.trim().replace(/\/$/, "");
}

export function getServerConfig() {
  return {
    apiBaseUrl: required(
      "REUSECONNECT_API_BASE_URL",
      process.env.REUSECONNECT_API_BASE_URL,
    ),
    embedApiKey: required(
      "REUSECONNECT_EMBED_API_KEY",
      process.env.REUSECONNECT_EMBED_API_KEY,
    ),
    embedOrigin: required(
      "REUSECONNECT_EMBED_ORIGIN",
      process.env.REUSECONNECT_EMBED_ORIGIN,
    ),
  };
}

export const SESSION_COOKIE = "partner_test_user";
