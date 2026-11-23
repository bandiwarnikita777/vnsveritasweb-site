import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VnS Veritas | Everyday Rituals, Beautifully Elevated',
  description: 'Thoughtfully crafted personal-care and lifestyle essentials from VnS Veritas.',
  icons: {
    icon: '/images/brand/image.png',
  },
  openGraph: {
    title: 'VnS Veritas | Everyday Rituals, Beautifully Elevated',
    description: 'Thoughtfully crafted personal-care and lifestyle essentials from VnS Veritas.',
    images: ['/images/brand/image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
