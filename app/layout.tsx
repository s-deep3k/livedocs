import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Inter} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { Provider } from "./Provider";
const inter = Inter({ subsets: ["latin"] , variable: "--font-sans"});

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "Your go-to collaborative editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={
      { baseTheme:dark,
        variables:{
          fontSize:'16px',
          colorPrimary: '#3371FF'
        }
      }
    }>
      <html lang="en" suppressHydrationWarning>{/** Text content does not match server-rendered HTML ERROR */}
        <body className={cn("min-h-screen font-sans antialiased",inter.variable)}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
