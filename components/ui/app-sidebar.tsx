"use client";

import * as React from "react";
import * as Icons from "lucide-react";

import { useState, useEffect } from "react";

import { NavSingleBranch } from "@/components/ui/nav/single_branch";
import { NavNormal } from "@/components/ui/nav/normal";
import { NavUser } from "@/components/ui/nav/user";
import ItemSwitcher from "@/components/ui/ItemSwitcher";
import { Item } from "@/components/ui/ItemSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Command } from "@/components/ui/command";
import items from "@/data/items.json";
const sb_data = [
  {
    type: "sb",
    label: "Projects",
    items: [
      {
        title: "Overview",
        icon: Icons.Home,
        url_prefix: "projects-overview",
        isActive: false,
        items: [
          { title: "All Tasks", url: "#" },
          { title: "Milestones", url: "#" },
          { title: "Sprint Progress", url: "#" },
        ],
      },
      {
        title: "Tasks & Issues",
        icon: Icons.CheckSquare,
        url_prefix: "tasks-issues",
        isActive: false,
        items: [
          { title: "Pending Approvals", url: "#" },
          { title: "Completed Tasks", url: "#" },
          { title: "Reported Issues", url: "#" },
        ],
      },
      {
        title: "Phases",
        icon: Icons.Layers,
        url_prefix: "phases",
        isActive: false,
        items: [
          { title: "Design", url: "#" },
          { title: "Frontend", url: "#" },
          { title: "Backend", url: "#" },
          { title: "Deployment", url: "#" },
        ],
      },
      {
        title: "Testing",
        icon: Icons.CheckCircle,
        url_prefix: "testing",
        isActive: false,
        items: [
          { title: "Test Results", url: "#" },
          { title: "CI/CD Integration", url: "#" },
        ],
      },
    ],
  },
  {
    type: "sb",
    label: "Teams",
    items: [
      {
        title: "Directory",
        icon: Icons.Users,
        url_prefix: "directory",
        isActive: false,
        items: [
          { title: "Members", url: "#" },
          { title: "Roles & Permissions", url: "#" },
        ],
      },
      {
        title: "Collaboration Metrics",
        icon: Icons.Activity,
        url_prefix: "metrics",
        isActive: false,
        items: [
          { title: "Team Velocity", url: "#" },
          { title: "Contribution Breakdown", url: "#" },
        ],
      },
    ],
  },
  {
    type: "sb",
    label: "Organization",
    items: [
      {
        title: "Structure",
        icon: Icons.Building,
        url_prefix: "structure",
        isActive: false,
        items: [
          { title: "Org Chart", url: "#" },
          { title: "Resource Allocation", url: "#" },
        ],
      },
      {
        title: "Updates",
        icon: Icons.RefreshCw,
        url_prefix: "updates",
        isActive: false,
        items: [
          { title: "Changelog", url: "#" },
          { title: "Release Notes", url: "#" },
        ],
      },
    ],
  },
  {
    type: "sb",
    label: "Collaboration",
    items: [
      {
        title: "Chat",
        icon: Icons.MessageCircle,
        url_prefix: "chat",
        isActive: false,
        items: [
          { title: "Direct Messages", url: "#" },
          { title: "Team Chats", url: "#" },
        ],
      },
      {
        title: "Meetings",
        icon: Icons.Calendar,
        url_prefix: "meetings",
        isActive: false,
        items: [
          { title: "Schedule Meetings", url: "#" },
          { title: "Meeting Notes", url: "#" },
        ],
      },
    ],
  },
];

const norm_data = [
  {
    type: "normal",
    label: "Admin",
    items: [
      { name: "Settings", icon: Icons.Settings, url: "/settings" },
      { name: "Manage Roles", icon: Icons.Key, url: "/roles" },
      { name: "Audit Logs", icon: Icons.Clock, url: "/audit-logs" },
      { name: "Logout", icon: Icons.LogOut, url: "/logout" },
    ],
  },
];


const user_data = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCollapsed, setCollapsed] = useState(false);
  const { state } = useSidebar();
  useEffect(() => {
    setCollapsed(state === "collapsed");
  }, [state]);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ItemSwitcher
          items={items as Item[]}
          showAvatars={false}
          isCollapsed={isCollapsed}
        />

        <NavSingleBranch items={sb_data[0].items} label={sb_data[0].label} />
        <NavSingleBranch items={sb_data[1].items} label={sb_data[1].label} />
        <NavSingleBranch items={sb_data[2].items} label={sb_data[2].label} />
        <NavSingleBranch items={sb_data[3].items} label={sb_data[3].label} />
        <NavNormal items={norm_data[0].items} label={norm_data[0].label} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user_data} />
      </SidebarFooter>
    </Sidebar>
  );
}
