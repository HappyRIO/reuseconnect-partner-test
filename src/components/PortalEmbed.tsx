"use client";

import { useState } from "react";

type Mode = "new" | "returning";

export function PortalEmbed() {
  const [mode, setMode] = useState<Mode>("new");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    setError(null);
    setLoading(true);
    setEmbedUrl(null);

    try {
      const response = await fetch("/api/embed-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const result = (await response.json()) as {
        success: boolean;
        error?: string;
        data?: { embedUrl: string };
      };

      if (!response.ok || !result.success || !result.data?.embedUrl) {
        setError(result.error || "Failed to open embed portal");
        return;
      }

      setEmbedUrl(result.data.embedUrl);
    } catch {
      setError("Failed to open embed portal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="mode" className="mb-1 block text-sm font-medium text-slate-700">
            Session mode
          </label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="new">New user (full profile)</option>
            <option value="returning">Returning user (email only)</option>
          </select>
        </div>
        <button
          type="button"
          onClick={openPortal}
          disabled={loading}
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Opening…" : "Open ReuseConnect portal"}
        </button>
      </div>

      {error ? (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {embedUrl ? (
        <div className="overflow-hidden rounded border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 break-all">
            {embedUrl}
          </div>
          <iframe
            title="ReuseConnect embed portal"
            src={embedUrl}
            className="h-[75vh] w-full border-0"
            allow="clipboard-write"
          />
        </div>
      ) : (
        <div className="flex h-[40vh] items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          Click “Open ReuseConnect portal” to load the iframe.
        </div>
      )}
    </div>
  );
}
