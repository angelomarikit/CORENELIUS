import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-crimson">404</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight">This page is not on the site.</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-crimson px-5 py-3 text-sm text-white">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
