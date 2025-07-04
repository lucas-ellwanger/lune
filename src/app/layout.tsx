import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Loader2Icon } from "lucide-react";

import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe",
  description: "Generate Next.JS web applications powered by AI.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster
            icons={{
              loading: (
                <Loader2Icon
                  strokeWidth={3}
                  className="size-4 -mr-1 animate-spin"
                />
              ),
            }}
          />
          {children}
        </body>
      </html>
    </TRPCReactProvider>
  );
}
