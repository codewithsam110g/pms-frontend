"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function NavPlain({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { state } = useSidebar();
  const [isCollapsed, setCollapse] = useState(false);

  useEffect(() => {
    setCollapse(state === "collapsed");
  }, [state]);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild size="sm">
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="shrink-0" />
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <SidebarMenuButton asChild size="sm">
                  <a
                    href={item.url}
                    className="flex items-center gap-2 select-none"
                  >
                    <item.icon className="shrink-0" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
