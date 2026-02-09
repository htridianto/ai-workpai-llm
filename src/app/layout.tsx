import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkPai Dashboard",
  description: "AI Agent Workspace",
};

import { NextAuthProvider } from "@/components/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} text-slate-200 selection:bg-accent-500/30 selection:text-accent-200 bg-charcoal-950`}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
