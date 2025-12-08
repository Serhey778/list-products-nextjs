import AppLogo from '../ui/app-logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 text-white shrink-0 items-end rounded-lg bg-green-600 p-4 md:h-52">
        <AppLogo />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </main>
  );
}
