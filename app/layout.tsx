import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authority",
  description: "A comprehensive authentication toolkit",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
  } else if (isAuthRoute) {
    if (isLoggedIn) {
      redirect(DEFAULT_LOGIN_REDIRECT);
    }
  } else if (!isLoggedIn && !isPublicRoute) {
    redirect("/auth/login/");
  }

  return (
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster swipeDirections={["right", "left"]} richColors closeButton expand duration={4000} />
        </body>
      </html>
    </SessionProvider>
  );
}
