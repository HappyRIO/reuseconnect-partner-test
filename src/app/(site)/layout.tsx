export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 overflow-auto px-4 py-8">
      {children}
    </main>
  );
}
