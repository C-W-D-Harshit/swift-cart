import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutProvider from "@/components/providers/layout-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Swift-Cart",
    default: "Swift-Cart", // a default is required when creating a template
  },
  description: "Swift-Cart is a modern e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <LayoutProvider>{children}</LayoutProvider>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
