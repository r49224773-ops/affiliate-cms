import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Site",
  description: "Product reviews and buying guides",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary-700">
              Affiliate Site
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
              <Link href="/posts/" className="hover:text-primary-600">
                Articles
              </Link>
              <Link href="/products/" className="hover:text-primary-600">
                Reviews
              </Link>
              <Link href="/admin/" className="text-primary-600 hover:text-primary-700">
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Affiliate Site. Built with Next.js + Decap CMS + Cloudflare.
          </div>
        </footer>
      </body>
    </html>
  );
}
