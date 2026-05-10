import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aqwaya',
  description: 'AI-Powered conversion engine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
