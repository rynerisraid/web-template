"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TrendingUp,
  Activity,
  Shield,
  MessageCircle,
  Calculator,
  BarChart3,
  Users,
  Package,
} from "lucide-react";

import { NavMain } from "@/components/dash/nav-main";
import { NavProjects } from "@/components/dash/nav-projects";
import { NavUser } from "@/components/dash/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarHeader } from "@/components/dash/app-sidebar-header";

// 股票交易分析平台的导航数据
const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Strategy Configuration",
      url: "/admin/strategy-configuration",
      icon: Settings2,
      items: [
        {
          title: "Algorithm Settings",
          url: "/admin/strategy-configuration/algorithm-settings",
        },
        {
          title: "Risk Models",
          url: "/admin/strategy-configuration/risk-models",
        },
        {
          title: "Profit Calculator",
          url: "/admin/strategy-configuration/profit-calculator",
        },
      ],
    },
    {
      title: "Playground",
      url: "/admin/playground",
      icon: Bot,
      items: [
        {
          title: "Strategy Testing",
          url: "/admin/playground/strategy-testing",
        },
        {
          title: "Simulation Settings",
          url: "/admin/playground/simulation-settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Market Analysis Engine",
      url: "/admin/projects/market-engine",
      icon: Frame,
    },
    {
      name: "Sentiment Processing",
      url: "/admin/projects/sentiment",
      icon: PieChart,
    },
    {
      name: "Risk Algorithms",
      url: "/admin/projects/risk",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
