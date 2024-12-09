"use client";

import * as React from "react";
import {
  BookOpen,
  LifeBuoy,
  ListOrderedIcon,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

const data = {
  user: {
    name: "Harshit Sharma",
    email: "hello@cleverdeveloper.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: BookOpen,
      items: [
        {
          title: "All Products",
          url: "/admin/products",
        },
        {
          title: "Categories",
          url: "/admin/products/categories",
        },
        {
          title: "Attributes",
          url: "/admin/products/attributes",
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ListOrderedIcon,
      items: [
        {
          title: "All Orders",
          url: "/admin/orders/all",
        },
        {
          title: "Pending Orders",
          url: "/admin/orders/pending",
        },
        {
          title: "Completed Orders",
          url: "/admin/orders/completed",
        },
      ],
    },
    {
      title: "Customers",
      url: "/admin/customers",
      icon: Settings2,
      items: [
        {
          title: "All Customers",
          url: "/admin/customers/all",
        },
        {
          title: "Add New Customer",
          url: "/admin/customers/new",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;
  if (user) {
    data.user = {
      name: user.fullName || "Harshit Sharma",
      email: user.email,
      avatar: user.avatarUrl || "/avatars/shadcn.jpg",
    };
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground">
                  <div className="relative size-8">
                    <Image src={"/logo.png"} alt="logo" fill />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Swift-Cart</span>
                  <span className="truncate text-xs" title="Admin Dashboard">
                    Admin Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
