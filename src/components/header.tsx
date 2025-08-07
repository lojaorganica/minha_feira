
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

  let links = [];
  if (userType === 'customer') {
    links = customerMenuLinks;
  } else if (userType === 'farmer') {
    links = farmerMenuLinks;
  }

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
              {[...links, { href: "/cart", label: "Meu Carrinho", icon: ShoppingCart }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg hover:bg-accent hover:text-accent-foreground"
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
              {links.map((link) => (
                 <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="w-full"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg hover:bg-accent hover:text-accent-foreground"
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

  const isCatalogPage = pathname === '/catalog';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        <div className="flex items-center gap-2 shrink-0">
            <div className="lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Menu className="h-8 w-8" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 flex flex-col w-[300px] sm:w-[350px]">
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
            <div className="shrink-0">
              <Logo size="small" />
            </div>
        </div>
        
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-4">
             {isUserLoaded && (
              <>
                {links.map(link => (
                  <Button key={link.href} asChild variant="ghost" className="text-base hover:bg-accent hover:text-accent-foreground">
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </>
            )}
             {isCatalogPage && (
                <div className="relative w-full max-w-xs ml-4">
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
        </nav>
        
         <div className="flex items-center gap-2">
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
              <div className="hidden lg:flex">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sair
                </Button>
              </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
