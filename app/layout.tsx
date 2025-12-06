import type { Metadata } from 'next';
import './globals.css';
import { inter } from './ui/fonts';

export const metadata: Metadata = {
  title: 'List Products',
  description: 'A project called <<Product List>> was created using Next.js ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
