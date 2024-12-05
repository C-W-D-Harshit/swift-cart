"use client";

import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TopHeader from "../layout/TopHeader";
import { usePathname } from "next/navigation";
import TopLoader from "../loaders/TopLoader";
import { ThemeProvider } from "./theme-provider";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../layout/admin/AppSidebar";
import { DynamicBreadcrumb } from "../layout/admin/dynamic-breadcrumb";
import AdminWidget from "../AdminWidget";
import { useSession } from "next-auth/react";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  if (pathname.startsWith("/admin")) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TopLoader />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-hidden overflow-y-auto">
            <header className="flex h-16 shrink-0 items-center gap-2 sticky top-1">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumb />
              </div>
            </header>
            <main className="flex-1 flex flex-col p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
      disableTransitionOnChange
    >
      <main className="min-h-dvh flex flex-col">
        <TopLoader />
        {session && session.user && session.user.role === "ADMIN" && (
          <AdminWidget />
        )}
        <TopHeader />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
