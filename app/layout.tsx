import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Markdown URL Preview",
  description: "Convert markdown URLs into beautifully rendered preview pages",
  keywords: ["markdown", "url", "preview", "online", "render"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
