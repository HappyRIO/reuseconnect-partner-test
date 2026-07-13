"use client";

import { useCallback, useEffect, useState } from "react";

type Mode = "new" | "returning";

type PortalEmbedProps = {
  userLabel: string;
};

export function PortalEmbed({ userLabel }: PortalEmbedProps) {
  const [mode, setMode] = useState<Mode>("new");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const openPortal = useCallback(async (sessionMode: Mode) => {
    setError(null);
    setLoading(true);
    setEmbedUrl(null);

    try {
      const response = await fetch("/api/embed-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: sessionMode }),
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
  }, []);

  useEffect(() => {
    void openPortal(mode);
    // Auto-load once on mount; use Reload after changing mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPortal]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Slim partner toolbar — not a second product sidebar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2">
        <p className="mr-auto text-xs text-slate-500">
          Partner session: <span className="text-slate-700">{userLabel}</span>
        </p>
        <label htmlFor="mode" className="sr-only">
          Session mode
        </label>
        <select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="rounded border border-slate-300 bg-white px-2 py-1.5 text-xs"
        >
          <option value="new">New user (full profile)</option>
          <option value="returning">Returning user (email only)</option>
        </select>
        <button
          type="button"
          onClick={() => void openPortal(mode)}
          disabled={loading}
          className="rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Opening…" : "Reload portal"}
        </button>
      </div>

      {error ? (
        <p className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {embedUrl ? (
        <iframe
          title="ReuseConnect embed portal"
          src={embedUrl}
          className="min-h-0 w-full flex-1 border-0"
          allow="clipboard-write"
        />
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center bg-slate-50 text-sm text-slate-500">
          {loading ? "Opening ReuseConnect…" : "Portal could not be loaded."}
        </div>
      )}
    </div>
  );
}
