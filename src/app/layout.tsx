import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} text-slate-900 dark:text-slate-200 selection:bg-accent-500/30 selection:text-accent-200 bg-gray-50 dark:bg-charcoal-950 transition-colors duration-200`}>
        <ThemeProvider>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
