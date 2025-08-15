"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  DatabaseZap,
  LucideSettings2,
  SettingsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

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
import { NavSecondary } from "@/components/dash/nav-secondary";
import { Session } from "next-auth";

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
      url: "/dashboard",
      icon: SquareTerminal,
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
      url: "/admin/playground", // 添加具体的 url 路径
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
    {
      title: "Data Warehousing",
      url: "#", // 添加 url 属性
      icon: DatabaseZap,
      items: [
        {
          title: "Data Source",
          url: "/dashboard/data-sources",
        },
        {
          title: "Data Tasks",
          url: "/dashboard/data-tasks",
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

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar({ session }: { session: Session }) {
  const user = session?.user;
  const pathname = usePathname();

  // 确保用户对象包含NavUser组件需要的所有字段
  const navUser = {
    name: user?.name || "Unknown User",
    email: user?.email || "unknown@example.com",
    avatar: user?.image || "/avatars/default.png",
  };

  // 创建一个带有 isActive 属性的 navMain 副本
  const navMainWithActive = React.useMemo(() => {
    return data.navMain.map((item) => {
      // 检查当前路径是否匹配主菜单项或其子菜单项
      const isMainActive = pathname === item.url;
      const isSubActive = item.items?.some(
        (subItem) => pathname === subItem.url
      );

      // 为子项添加 isActive 属性
      const itemsWithActive = item.items?.map((subItem) => ({
        ...subItem,
        isActive: pathname === subItem.url,
      }));

      return {
        ...item,
        isActive: isMainActive || isSubActive,
        items: itemsWithActive,
      };
    });
  }, [pathname]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
