
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Tractor, Search, History, Package, ShoppingBasket, LogOut, Users } from "lucide-react";
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

const Header = () => {
  const { cartCount } = useCart();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearch();
  const { userType, isUserLoaded, logout } = useUser();

  const isCatalogPage = pathname === '/catalog';
  
  const handleLogout = () => {
    logout();
    setSheetOpen(false);
    router.push('/welcome');
  };

  const navLinks = [
    { href: "/welcome", label: "Início" },
  ];

  const loginLinks = [
      { href: "/login/customer", label: "Sou Cliente", icon: User},
      { href: "/login/farmer", label: "Sou Agricultor", icon: Tractor },
  ]

  const customerMenuLinks = [
    { href: "/history", label: "Meus Pedidos", icon: History },
    { href: "/profile", label: "Meu Perfil", icon: User },
  ]

  const farmerMenuLinks = [
    { href: "/profile", label: "Meu Perfil", icon: User },
    { href: "/dashboard?tab=orders", label: "Pedidos", icon: ShoppingBasket },
    { href: "/dashboard?tab=products", label: "Meus produtos", icon: Package },
    { href: "#", label: "Meus Clientes", icon: Users },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
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
                <Logo />
              </div>
              
              <div className="flex flex-col flex-grow p-4">
                  {/* Common Links */}
                  <nav className="flex flex-col gap-2">
                    <Button asChild variant="ghost" className="w-full justify-start text-base" onClick={() => setSheetOpen(false)}>
                        <Link href="/welcome">Início</Link>
                    </Button>
                  </nav>
                  
                  <Separator className="my-4" />

                  {/* Unauthenticated User */}
                  {isUserLoaded && !userType && (
                    <nav className="flex flex-col gap-2">
                        {loginLinks.map((link) => (
                        <Button asChild key={link.href} variant="outline" className="w-full justify-start" onClick={() => setSheetOpen(false)}>
                            <Link href={link.href} className="text-base">
                            <link.icon className="h-4 w-4 mr-2"/>
                            {link.label}
                            </Link>
                        </Button>
                        ))}
                    </nav>
                  )}

                  {/* Customer Menu */}
                  {isUserLoaded && userType === 'customer' && (
                    <>
                        <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">Área do Cliente</h3>
                        <nav className="flex flex-col gap-2">
                        {customerMenuLinks.map((link) => (
                        <Button asChild key={link.href} variant="ghost" className="w-full justify-start" onClick={() => setSheetOpen(false)}>
                            <Link href={link.href} className="text-base">
                                <link.icon className="h-4 w-4 mr-2"/>
                                {link.label}
                            </Link>
                        </Button>
                        ))}
                        </nav>
                    </>
                  )}

                  {/* Farmer Menu */}
                  {isUserLoaded && userType === 'farmer' && (
                    <>
                        <h3 className="px-2 mb-2 text-sm font-semibold text-muted-foreground">Área do Agricultor</h3>
                        <nav className="flex flex-col gap-2">
                        {farmerMenuLinks.map((link) => (
                        <Button asChild key={link.href} variant="ghost" className="w-full justify-start" onClick={() => setSheetOpen(false)}>
                            <Link href={link.href} className="text-base">
                                <link.icon className="h-4 w-4 mr-2"/>
                                {link.label}
                            </Link>
                        </Button>
                        ))}
                        </nav>
                    </>
                  )}
                  
                  {/* Logout Button */}
                  {isUserLoaded && userType && (
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
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
             {isUserLoaded && userType === 'customer' && (
                <Link href="/history" className="font-medium text-foreground/80 hover:text-foreground transition-colors">Meus Pedidos</Link>
             )}
              {isUserLoaded && userType && (
                 <Link href="/profile" className="font-medium text-foreground/80 hover:text-foreground transition-colors">Meu Perfil</Link>
              )}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-8 w-8" />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Carrinho de Compras</span>
              </Link>
            </Button>
             {isUserLoaded && userType && (
                <Button variant="outline" size="sm" onClick={handleLogout}>Sair</Button>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
