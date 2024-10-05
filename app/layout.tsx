import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
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
    <html lang="en" suppressHydrationWarning> {/** Text content does not match server-rendered HTML ERROR */}
      <body className={cn("min-h-screen font-sans antialiased",inter.variable)}>{children}</body>
    </html>
  );
}
