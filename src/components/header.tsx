
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Search, History, Package, ShoppingBasket, LogOut, Users, Heart, Tag, BookOpen, BarChart3, FileText, Activity, Tags, GalleryHorizontal } from "lucide-react";
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
import { cn } from "@/lib/utils";

const customerMenuLinks = [
    { href: "/catalog", label: "Catálogo", icon: BookOpen },
    { href: "/select-farmers", label: "Agricultores", icon: Heart },
    { href: "/favorites", label: "Favoritos", icon: Heart },
    { href: "/promotions",label: "Promoções", icon: Tag },
    { href: "/history", label: "Histórico", icon: History },
];

const farmerMenuLinks = [
    { href: "/dashboard?tab=orders", label: "Pedidos", icon: ShoppingBasket },
    { href: "/dashboard?tab=products", label: "Meus Produtos", icon: Package },
    { href: "/dashboard/inventory", label: "Controle de Estoque", icon: Activity },
    { href: "/dashboard/prices", label: "Tabela de Preços", icon: Tags },
    { href: "/dashboard/customers", label: "Meus Clientes", icon: Users },
    { href: "/dashboard/statistics", label: "Estatísticas", icon: BarChart3 },
    { href: "/dashboard/romaneio", label: "Romaneio", icon: FileText },
    { href: "/gallery", label: "Propagandas", icon: GalleryHorizontal },
];

const Header = () => {
  const { cartCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, userType, isUserLoaded, logout } = useUser();
  const [isSheetOpen, setSheetOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    setSheetOpen(false);
    router.push('/welcome');
  };

  const handleNavigate = (href: string) => {
    setSheetOpen(false);
    setTimeout(() => {
        router.push(href);
    }, 150);
  };

  const isCatalogPage = pathname === '/catalog';
  
  const links = userType === 'customer' ? customerMenuLinks : userType === 'farmer' ? farmerMenuLinks : [];

  const renderMobileMenu = () => {
    if (!isUserLoaded) {
      return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (user) {
        let title, subtitle, menuItems;
        const mobileMenuLinks = userType === 'customer' 
          ? [...links, { href: "/cart", label: "Meu Carrinho", icon: ShoppingCart }] 
          : links;
          
        if(userType === 'customer') {
            const firstName = user.name.split(' ')[0];
            title = `Olá, ${firstName}!`;
            subtitle = "Área do Cliente";
            menuItems = [{ href: "/profile", label: "Meu Perfil", icon: User }, ...mobileMenuLinks];
        } else {
            const farmer = user as Farmer;
            const nameToGreet = farmer.responsibleName || farmer.name;
            const firstName = nameToGreet.split(' ')[0];
            title = `Olá, ${firstName}!`;
            subtitle = "Área do Agricultor";
            menuItems = [{ href: "/profile", label: "Meu Perfil", icon: User },...links];
        }

        return (
            <>
                <div className="px-2 mb-4">
                    <h2 className="text-xl font-bold text-primary">{title}</h2>
                    <h3 className="text-base font-semibold text-muted-foreground">{subtitle}</h3>
                </div>
                <nav className="flex flex-col gap-1">
                {menuItems.map((link) => (
                    <Button
                        key={link.href}
                        variant="ghost"
                        className="w-full justify-start text-lg hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleNavigate(link.href)}
                    >
                        <link.icon className="h-4 w-4 mr-2" />
                        {link.label}
                    </Button>
                ))}
                </nav>
            </>
        );
    }
    return null;
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section */}
        <div className="flex items-center gap-2 lg:w-1/4 lg:flex-shrink-0">
            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 flex flex-col w-[300px] sm:w-[350px]">
                  <div className="p-4 border-b">
                    <Logo isClickable={false} />
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <div className="flex-grow">{renderMobileMenu()}</div>
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
          <div className="flex-shrink-0 -ml-2">
            <Logo size="small" />
          </div>
        </div>
        
        {/* Center Section (Desktop Navigation) */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-2">
           {isUserLoaded && links.map(link => (
            <Button key={link.href} asChild variant="ghost" className="text-base font-bold text-primary hover:text-accent-foreground hover:bg-accent transition-none">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
        
        {/* Right Section */}
        <div className="flex items-center justify-end gap-2 lg:w-1/4">
           <Link href="/profile" className="hidden lg:flex">
                <Button variant="ghost" size="icon" aria-label="Meu Perfil">
                   <User className="h-6 w-6" />
                </Button>
            </Link>
            
          {isUserLoaded && userType === 'customer' && (
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-7 w-7" strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Carrinho de Compras</span>
              </Link>
            </Button>
          )}

          <div className="hidden lg:flex">
            {isUserLoaded && user && (
                <Button variant="outline" size="sm" onClick={handleLogout}>
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
