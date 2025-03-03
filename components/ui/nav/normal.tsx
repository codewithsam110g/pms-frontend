"use client";

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components

export function NavNormal({
  label,
  items,
}: {
  label: string;
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed"; // Check if the sidebar is collapsed

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="select-none">{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    aria-label={item.name}
                    className="select-none"
                  >
                    <item.icon />
                    {!isCollapsed && <span>{item.name}</span>}
                  </a>
                </SidebarMenuButton>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" align="center" className="text-sm">
                  {item.name}
                </TooltipContent>
              )}
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
