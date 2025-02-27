import type { Metadata } from "next";
import "./globals.css";
import { Manrope, DM_Sans, Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from "@/providers/theme-provider";
import {dark} from "@clerk/themes"
import {ClerkProvider} from "@clerk/nextjs"
import { Toaster } from "sonner";

const manrope = Manrope({ subsets: ['latin'] })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

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
        className={`${manrope.className} bg-black`}
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
