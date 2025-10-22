
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Search, History, Package, ShoppingBasket, LogOut, Users, Heart, Tag, BookOpen, BarChart3, FileText, Activity, Tags, GalleryHorizontal, FileArchive, Droplet, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';

import Logo from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";
import { Separator } from "./ui/separator";
import { useSearch } from "@/hooks/use-search";
import { Input } from "./ui/input";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import type { Farmer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const customerMenuLinks = [
    { href: "/profile", label: "Meu Perfil", icon: User },
    { href: "/catalog", label: "Catálogo", icon: BookOpen },
    { href: "/select-farmers", label: "Agricultores", icon: Users },
    { href: "/favorites", label: "Favoritos", icon: Heart },
    { href: "/promotions",label: "Promoções", icon: Tag },
    { href: "/gallery", label: "Divulgue as Feiras!", icon: GalleryHorizontal },
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
    { href: "/dashboard/documents", label: "Documentações", icon: FileArchive },
];

const Header = () => {
  const { cartCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, userType, isUserLoaded, logout } = useUser();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const nftAccordionContentRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = () => {
    logout();
    setSheetOpen(false);
    router.push('/welcome');
  };

  const handleNavigate = (href: string) => {
    setSheetOpen(false);
    router.push(href);
  };
  
  const handleAccordionChange = (value: string) => {
    if (value === "gota-nft") {
      // Pequeno timeout para esperar a animação do acordeão terminar
      setTimeout(() => {
        nftAccordionContentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 250);
    }
  };

  const isCatalogPage = pathname === '/catalog';
  
  const mobileLinks = userType === 'customer' ? customerMenuLinks : userType === 'farmer' ? farmerMenuLinks : [];

  const renderMobileMenu = () => {
    if (!isUserLoaded) {
      return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (user) {
        let title, subtitle;
        const customerLinks = [
          ...customerMenuLinks,
          { href: "/cart", label: "Meu Carrinho", icon: ShoppingCart }
        ]

        if(userType === 'customer') {
            const firstName = user.name.split(' ')[0];
            title = `Olá, ${firstName}!`;
            subtitle = "Área do Cliente";
        } else {
            const farmer = user as Farmer;
            const nameToGreet = farmer.responsibleName || farmer.name;
            const firstName = nameToGreet.split(' ')[0];
            title = `Olá, ${firstName}!`;
            subtitle = "Área do Agricultor";
        }

        const menuItems = userType === 'customer' ? customerLinks : farmerMenuLinks;

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
                        className="w-full justify-start text-lg font-bold hover:bg-accent hover:text-accent-foreground h-auto p-2"
                        onClick={() => handleNavigate(link.href)}
                    >
                        <link.icon className="h-4 w-4 mr-2" />
                        {link.label}
                    </Button>
                ))}
                 {userType === 'customer' && (
                    <Accordion type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
                        <AccordionItem value="gota-nft" className="border-b-0">
                           <AccordionTrigger 
                                className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start text-lg font-bold hover:bg-accent hover:text-accent-foreground !no-underline p-2 h-auto")}
                            >
                               <div className="flex items-center">
                                    <Droplet className="h-4 w-4 mr-2"/>
                                    <span className="flex-grow">Resgate Gota/NFT</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent ref={nftAccordionContentRef} className="p-2">
                                <div className="relative aspect-square w-full max-w-[250px] mx-auto rounded-md overflow-hidden cursor-pointer" onClick={() => handleNavigate('/gota-nft')}>
                                    <video
                                        src="https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2FNFT%2001_Cenoura_Organica_Apaixonada.mp4?alt=media&token=633789db-deef-4720-b1ec-fb2e2a01e807"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
                </nav>
            </>
        );
    }
    return null;
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex h-16 items-center justify-between w-full">
          {/* Left Section - Logo and Mobile Menu */}
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 flex flex-col w-[300px] sm:w-[350px]">
                  <div className="border-b pt-12 pb-4 px-4">
                    <Logo isClickable={false} />
                  </div>
                   <ScrollArea className="flex-grow p-4">
                        {renderMobileMenu()}
                    </ScrollArea>
                    {isUserLoaded && user && (
                        <div className="p-4 border-t mt-auto">
                            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2"/>
                                Sair
                            </Button>
                        </div>
                    )}
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden sm:flex -ml-2">
              <Logo size="small" />
            </div>
          </div>

          {/* Right Section - Icons and Logout */}
          <div className="flex items-center justify-end gap-2">
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

        {/* Desktop Navigation - now on its own line */}
        <nav className="hidden lg:flex w-full justify-center items-center py-1 min-h-[40px]">
          {isUserLoaded && userType && (
            (userType === 'customer' ? customerMenuLinks : farmerMenuLinks).map(link => (
              <Button key={link.href} asChild variant="ghost" className="text-base font-bold text-primary hover:text-accent-foreground hover:bg-accent">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))
          )}
          {isUserLoaded && userType === 'customer' && (
             <Button asChild variant="ghost" className="text-base font-bold text-primary hover:text-accent-foreground hover:bg-accent">
                <Link href="/gota-nft">Resgate Gota/NFT</Link>
              </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
