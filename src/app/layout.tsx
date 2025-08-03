import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';
import { SearchProvider } from '@/hooks/use-search';
import { CartProvider } from '@/components/cart-provider';

export const metadata: Metadata = {
  title: 'Mercado Verdante',
  description: 'Alimentos orgânicos de agricultores locais.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <CartProvider>
            <SearchProvider>
                <Header />
                <div className="flex-grow">
                {children}
                </div>
                <Toaster />
            </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
