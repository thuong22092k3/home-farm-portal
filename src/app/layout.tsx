import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vườn Nhà · Farmer Portal",
  description: "Không gian quản lý dành cho nhà vườn."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
