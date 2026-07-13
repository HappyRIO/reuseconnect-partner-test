import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalEmbed } from "@/components/PortalEmbed";
import { getCurrentUser } from "@/lib/auth";

export default async function PortalPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">ReuseConnect portal</h1>
          <p className="mt-1 text-sm text-slate-600">
            Signed in as {user.firstName} {user.lastName} ({user.email}).
            The iframe loads after your server mints an embed session.
          </p>
        </div>
        <Link href="/users" className="text-sm text-slate-600 hover:text-slate-900">
          View users
        </Link>
      </div>
      <PortalEmbed />
    </div>
  );
}
