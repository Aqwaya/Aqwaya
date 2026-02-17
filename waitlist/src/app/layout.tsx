import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aqwaya",
  description: "Digital marketing tool for businesses with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
