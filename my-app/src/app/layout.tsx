import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "BinDoc.AI - Strategic Investment Report",
  description: "A pragmatic, technology-driven solution for Lebanon's waste crisis. Strategic investment report for BinDoc.AI waste management platform.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
