/**
 * Full-bleed portal shell: partner header only (from root layout).
 * No partner sidebar / constrained content column — iframe fills the rest.
 */
export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      {children}
    </main>
  );
}
