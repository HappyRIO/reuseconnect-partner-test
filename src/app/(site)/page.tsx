import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Acme Partner Test
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Fake partner website for ReuseConnect embed
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          This app simulates a referral partner: users sign in here, the server
          calls <code className="rounded bg-slate-100 px-1">POST /api/embed/session</code>,
          then the portal is shown in an iframe.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {user ? (
            <Link
              href="/portal"
              className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Open portal
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Log in to continue
            </Link>
          )}
          <Link
            href="/users"
            className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            View test users
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">How to test</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
          <li>Run local backend (and ngrok) and deploy embed to Vercel.</li>
          <li>
            Set env vars: API base URL (ngrok), embed API key, embed origin.
          </li>
          <li>In admin, enable iframe embed for the partner and allow this site origin.</li>
          <li>Log in as a seed user, open Portal, load the iframe.</li>
        </ol>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Portal layout rule</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Partner chrome stays outside the iframe (header + logout). ReuseConnect
          keeps its own product sidebar inside the iframe. On <code className="rounded bg-slate-100 px-1">/portal</code>,
          this site uses a full-bleed page with no partner sidebar so users only see one product nav.
        </p>
      </section>
    </div>
  );
}
