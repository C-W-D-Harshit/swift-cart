"use client";

import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TopHeader from "../layout/TopHeader";
import { usePathname } from "next/navigation";
import TopLoader from "../loaders/TopLoader";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-dvh flex flex-col">
      <TopLoader />
      <TopHeader />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
