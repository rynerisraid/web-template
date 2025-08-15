import type React from "react";
import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dash/app-sidebar";
import { SessionWrapper } from "@/components/auth/session-wrapper";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Template Hub - Curated AI Resources & Templates",
  description:
    "Discover premium AI software templates, courses, and resources for developers and businesses",
  generator: "AI Template Hub",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionWrapper>
      <SidebarProvider>
        <AppSidebar session={session} />
        <main className="w-full">
          <div className="flex justify-between items-center h-12 w-full">
            <SidebarTrigger className="ml-2 my-2" />
            <div className="flex items-center gap-2 mr-2 my-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </SessionWrapper>
  );
}
