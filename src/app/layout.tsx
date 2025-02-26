import type { Metadata } from "next";
import "./globals.css";
import { Manrope, DM_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import {dark} from "@clerk/themes"
import {ClerkProvider} from "@clerk/nextjs"

const manrope = Manrope({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Pipo",
  description: "Build AI powered presentations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme: dark
    }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.style} antialised`}
        suppressHydrationWarning
      >
        <ThemeProvider
        attribute={'class'}
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
       {children}
       <Toaster />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
