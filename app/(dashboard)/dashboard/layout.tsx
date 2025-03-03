"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { ReactNode, Fragment } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // Split and filter out empty strings

  return (
    <SidebarProvider>
      <AppSidebar /> {/* Pass activePath to AppSidebar */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => (
                  <Fragment key={segment}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/${segments.slice(0, index + 1).join("/")}`}
                      >
                        {segment.charAt(0).toUpperCase() +
                          segment.slice(1).replace("-", " ")}{" "}
                        {/* Capitalize first letter and replace hyphens */}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < segments.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
