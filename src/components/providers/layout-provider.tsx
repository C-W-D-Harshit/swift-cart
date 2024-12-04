"use client";

import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TopHeader from "../layout/TopHeader";
import { usePathname } from "next/navigation";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-dvh flex flex-col">
      {/* <AnimatePresence mode="wait"> */}
      <TopHeader />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      {/* </AnimatePresence> */}
    </main>
  );
}
