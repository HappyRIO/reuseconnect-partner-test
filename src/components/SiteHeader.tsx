import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="shrink-0 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold tracking-tight text-slate-900">
            Acme Partner Test
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link href="/users" className="hover:text-slate-900">
              Users
            </Link>
            <Link href="/portal" className="hover:text-slate-900">
              Portal
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-slate-600 sm:inline">
                {user.firstName} {user.lastName}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-800"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
