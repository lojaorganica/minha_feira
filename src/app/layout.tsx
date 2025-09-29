
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SearchProvider } from '@/hooks/use-search';
import { CartProvider } from '@/components/cart-provider';
import { OrderHistoryProvider } from '@/components/order-history-provider';
import AppShell from '@/components/app-shell';
import { FavoritesProvider } from '@/hooks/use-favorites.tsx';
import { GalleryFavoritesProvider } from '@/hooks/use-gallery-favorites';
import SofiaAssistant from '@/components/sofia-assistant';

const APP_NAME = "Minha Feira";
const APP_DESCRIPTION = "Alimentos orgânicos de agricultores locais.";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className="antialiased min-h-screen flex flex-col">
        <GalleryFavoritesProvider>
          <FavoritesProvider>
            <OrderHistoryProvider>
              <CartProvider>
                  <SearchProvider>
                      <AppShell>
                        {children}
                      </AppShell>
                      {/* <SofiaAssistant /> */}
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
