import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AradaPay - Sosyal Harcama & Borç Takibi (IOU)',
  description: 'Arkadaş grupları ve sosyal çevreler arasında harcama ve borç takibi sağlayan modern platform.',
  robots: 'noindex, nofollow',
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-black text-zinc-100 min-h-screen selection:bg-[#30d158] selection:text-black">
        {children}
      </body>
    </html>
  );
}
