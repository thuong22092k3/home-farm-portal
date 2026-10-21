import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppI18nProvider } from "@/components/i18n-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vườn Nhà · Farmer Portal",
  description: "Không gian quản lý dành cho nhà vườn."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className="antialiased">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppI18nProvider locale="vi">{children}</AppI18nProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
