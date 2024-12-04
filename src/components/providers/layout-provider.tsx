"use client";

import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TopHeader from "../layout/TopHeader";

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
