"use client";

import { ChevronRight, LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavSingleBranch({
  label,
  items,
}: {
  label: string; // Section label input
  items: {
    title: string;
    url_prefix: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className={isCollapsed ? "sr-only select-none" : "select-none"}
      >
        {label}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {isCollapsed && item.items?.length ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon />
                    <span className="sr-only">{item.title}</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="right"
                  align="start"
                  className="w-48"
                >
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.title} asChild>
                      <a href={"/" + item.url_prefix + "/" + subItem.url}>
                        {subItem.title}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Collapsible defaultOpen={item.isActive}>
                <div className="flex items-center">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a className="flex items-center gap-2 select-none">
                        <item.icon />
                        <span className={isCollapsed ? "sr-only" : ""}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!isCollapsed && item.items?.length ? (
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="ml-auto">
                        <ChevronRight
                          className="transition-transform duration-200"
                          data-state-open="rotate-90"
                        />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                  ) : null}
                </div>
                {!isCollapsed && item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={"/" + item.url_prefix + "/" + subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </Collapsible>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
