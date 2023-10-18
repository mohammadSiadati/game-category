import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Appbar from '@/components/appBar/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Appbar />
      <body>{children}</body>
    </html>
  );
}
