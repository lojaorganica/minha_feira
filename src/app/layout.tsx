
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SearchProvider } from '@/hooks/use-search';
import { CartProvider } from '@/components/cart-provider';
import { OrderHistoryProvider } from '@/components/order-history-provider';
import AppShell from '@/components/app-shell';
import { FavoritesProvider } from '@/hooks/use-favorites.tsx';
import { GalleryFavoritesProvider } from '@/hooks/use-gallery-favorites';
import SofiaAssistant from '@/components/sofia-assistant';

export const metadata: Metadata = {
  title: 'Minha Feira',
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
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <GalleryFavoritesProvider>
          <FavoritesProvider>
            <OrderHistoryProvider>
              <CartProvider>
                  <SearchProvider>
                      <AppShell>
                        {children}
                      </AppShell>
                      <SofiaAssistant />
                      <Toaster />
                  </SearchProvider>
              </CartProvider>
            </OrderHistoryProvider>
          </FavoritesProvider>
        </GalleryFavoritesProvider>
      </body>
    </html>
  );
}
