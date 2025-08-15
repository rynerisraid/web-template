import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionWrapper } from "@/components/auth/session-wrapper";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Template Hub - Curated AI Resources & Templates",
  description:
    "Discover premium AI software templates, courses, and resources for developers and businesses",
  generator: "AI Template Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <SessionWrapper>
          <ThemeProvider storageKey="ai-hub-theme">
            <div className="flex min-h-screen flex-col">
              <Toaster />
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
