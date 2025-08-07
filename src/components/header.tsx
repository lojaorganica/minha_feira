
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Search, History, Package, ShoppingBasket, LogOut, Users, Heart, Tag, BookOpen } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { useSearch } from "@/hooks/use-search";
import { Input } from "./ui/input";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import type { Farmer } from "@/lib/types";

const customerMenuLinks = [
    { href: "/profile", label: "Meu Perfil", icon: User },
    { href: "/catalog", label: "Catálogo", icon: BookOpen },
    { href: "/select-farmers", label: "Meus Agricultores", icon: Heart },
    { href: "/promotions",label: "Promoções", icon: Tag },
    { href: "/cart", label: "Meu Carrinho", icon: ShoppingCart },
    { href: "/history", label: "Histórico", icon: History },
];

const farmerMenuLinks = [
    { href: "/profile", label: "Meu Perfil", icon: User },
    { href: "/dashboard?tab=orders", label: "Pedidos", icon: ShoppingBasket },
    { href: "/dashboard?tab=products", label: "Meus Produtos", icon: Package },
    { href: "/dashboard/customers", label: "Meus Clientes", icon: Users },
];


const Header = () => {
  const { cartCount } = useCart();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, userType, isUserLoaded, logout } = useUser();
  
  const handleLogout = () => {
    logout();
    setSheetOpen(false);
    router.push('/welcome');
  };

  const renderMobileMenu = () => {
    if (!isUserLoaded) {
      return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (userType === 'customer' && user) {
      const firstName = user.name.split(' ')[0];
      return (
        <>
            <div className="px-2 mb-4">
              <h2 className="text-xl font-bold text-primary">Olá, {firstName}!</h2>
              <h3 className="text-base font-semibold text-muted-foreground">Área do Cliente</h3>
            </div>
            <nav className="flex flex-col gap-1">
              {customerMenuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
        </>
      );
    } else if (userType === 'farmer' && user) {
      const farmer = user as Farmer;
      const nameToGreet = farmer.responsibleName || farmer.name;
      const firstName = nameToGreet.split(' ')[0];
      return (
        <>
            <div className="px-2 mb-4">
                <h2 className="text-xl font-bold text-primary">Olá, {firstName}!</h2>
                <h3 className="text-base font-semibold text-muted-foreground">Área do Agricultor / Empresário</h3>
            </div>
            <nav className="flex flex-col gap-1">
              {farmerMenuLinks.map((link) => (
                 <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                    >
                      <link.icon className="h-4 w-4 mr-2"/>
                      {link.label}
                    </Button>
                  </Link>
              ))}
            </nav>
        </>
      );
    } 
    return null;
  }

  const renderDesktopNav = () => {
    if (!isUserLoaded) {
      return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
    }
    
    // Filtra os links que não são o carrinho para o menu desktop
    const desktopCustomerLinks = customerMenuLinks.filter(link => link.href !== '/cart' && link.href !== '/profile');
    const desktopFarmerLinks = farmerMenuLinks.filter(link => link.href !== '/profile');

    if (userType === 'customer') {
       return (
        <>
           {desktopCustomerLinks.map(link => (
             <Link key={link.href} href={link.href} className="font-medium text-foreground/80 hover:text-foreground text-lg">
                {link.label}
              </Link>
          ))}
          <Link href="/profile" className="font-medium text-foreground/80 hover:text-foreground text-lg">Meu Perfil</Link>
        </>
       )
    } else if (userType === 'farmer') {
      return (
        <>
          {desktopFarmerLinks.map(link => (
             <Link key={link.href} href={link.href} className="font-medium text-foreground/80 hover:text-foreground text-lg">
                {link.label}
              </Link>
          ))}
           <Link href="/profile" className="font-medium text-foreground/80 hover:text-foreground text-lg">Meu Perfil</Link>
        </>
      );
    } 
    return null;
  }

  const isCatalogPage = pathname === '/catalog';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center px-4 sm:px-6 lg:px-8 py-2">
        <div className="mr-4 hidden md:flex">
          <Logo size="small" />
        </div>
        
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col">
              <div className="p-4 border-b">
                 <Logo isClickable={false} />
              </div>
              
              <div className="flex flex-col flex-grow p-4">
                  <div className="flex-grow">
                      {renderMobileMenu()}
                  </div>

                  {isUserLoaded && user && (
                    <div className="mt-auto">
                        <Separator className="my-4" />
                        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2"/>
                            Sair
                        </Button>
                    </div>
                  )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {isCatalogPage && (
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Buscar produtos..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-4 text-lg">
                {renderDesktopNav()}
              </nav>
              {isUserLoaded && userType === 'customer' && (
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link href="/cart">
                    <ShoppingCart className="h-6 w-6" strokeWidth={2.25} />
                    {cartCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        {cartCount}
                      </span>
                    )}
                    <span className="sr-only">Carrinho de Compras</span>
                  </Link>
                </Button>
              )}
             {isUserLoaded && user && (
                <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
                    Sair
                </Button>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
