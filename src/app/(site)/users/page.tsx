import { listUsers } from "@/lib/db";

export default function UsersPage() {
  const users = listUsers();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Test users</h1>
        <p className="mt-1 text-sm text-slate-600">
          Simple internal database seeded from <code className="rounded bg-slate-100 px-1">data/users.json</code>.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">External ID</th>
              <th className="px-4 py-3 font-medium">Organisation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 font-mono text-xs">{user.externalUserId}</td>
                <td className="px-4 py-3">{user.organisationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
