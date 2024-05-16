import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mango Test Range Component',
  description:
    'Create a Normal/FixedValues Range Components for this technical challenge for Mango',
  authors: [
    {
      name: 'Gianluca Galota',
      url: 'https://www.gianlucagalota.dev',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
