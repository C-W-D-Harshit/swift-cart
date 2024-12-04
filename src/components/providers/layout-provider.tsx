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
    <main>
      {/* <AnimatePresence mode="wait"> */}
      <TopHeader />
      <Header />
      {children}
      <Footer />
      {/* </AnimatePresence> */}
    </main>
  );
}
