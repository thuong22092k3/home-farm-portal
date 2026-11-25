import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppI18nProvider } from "@/components/i18n-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppQueryClientProvider } from "@/data/api/queryClient";
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
          <AppQueryClientProvider>
            <AppI18nProvider locale="vi">{children}</AppI18nProvider>
          </AppQueryClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
