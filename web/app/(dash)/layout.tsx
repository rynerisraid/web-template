import type React from "react";
import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dash/app-sidebar";
import { SessionWrapper } from "@/components/auth/session-wrapper";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

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
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger className="ml-4 mt-4" />
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </SessionWrapper>
  );
}
