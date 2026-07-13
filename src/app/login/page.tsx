import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/portal");
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-xl font-semibold tracking-tight">Partner login</h1>
      <p className="mt-1 text-sm text-slate-600">
        Use a seed user from <code className="rounded bg-slate-100 px-1">data/users.json</code>.
        Default password: <code className="rounded bg-slate-100 px-1">password123</code>
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
