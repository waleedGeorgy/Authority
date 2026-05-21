import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap'
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap'
});

const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Authority",
  description: "A comprehensive authentication toolkit",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

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
        <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}>
          {children}
          <Toaster swipeDirections={["right", "left"]} richColors closeButton expand duration={4000} />
        </body>
      </html>
    </SessionProvider>
  );
}
