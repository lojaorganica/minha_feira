
"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Minus, ShoppingCart, Tractor, X, Heart, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { getFarmerById } from "@/lib/data";
import { useFavorites } from "@/hooks/use-favorites.tsx";


interface ProductCardProps {
  product: Product;
  farmerName: string;
  responsibleName?: string;
}

const ProductCard = ({ product, farmerName, responsibleName }: ProductCardProps) => {
  const { addToCart, cartFarmerId, handleConfirmClearAndAddToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isKgProduct = product.unit === 'kg';
  const initialQuantity = isKgProduct ? 0.2 : 1; // 200g ou 1 unidade

  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isLocallyFavorite, setIsLocallyFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionNeedsTruncation = product.description.length > 120;

  useEffect(() => {
    setIsLocallyFavorite(isFavorite(product.id));
  }, [isFavorite, product.id]);


  const isFarmerDifferent = cartFarmerId !== null && product.farmerId !== cartFarmerId;
  const currentFarmerInCartName = cartFarmerId ? getFarmerById(cartFarmerId)?.name ?? null : '';
  
  const handleActionAttempt = () => {
    if (isFarmerDifferent) {
      setAlertOpen(true);
      return false; 
    }
    return true; 
  };
  
  const handleToggleFavorite = () => {
    setIsLocallyFavorite(prev => !prev);
    toggleFavorite(product);
  }

  const handleAddToCartClick = () => {
    if (!handleActionAttempt()) return;

    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  const confirmAndAdd = () => {
    handleConfirmClearAndAddToCart(product, quantity);
    setAlertOpen(false);
  }

  const handleQuantityChange = (amount: number) => {
    if (!handleActionAttempt()) return;
    setQuantity(prev => {
        // Corrigir imprecisão de ponto flutuante
        const newQuantity = parseFloat((prev + amount).toPrecision(12));
        return isKgProduct ? Math.max(0.2, newQuantity) : Math.max(1, newQuantity);
    });
  };
  
  const isLojaOrganica = product.farmerId === '134';

  const renderQuantityInput = () => {
    if (isKgProduct) {
        const displayGrams = Math.round(quantity * 1000);
        return (
             <div className="flex w-full items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => handleQuantityChange(-0.1)} aria-label="Diminuir quantidade em 100g" className="h-10 px-3" disabled={isFarmerDifferent || quantity <= 0.2}>
                    <Minus className="h-4 w-4" />
                </Button>
                <div className="w-full h-10 text-center font-bold text-xl flex items-center justify-center border rounded-md">
                   {displayGrams} g
                </div>
                <Button size="icon" variant="outline" onClick={() => handleQuantityChange(0.1)} aria-label="Aumentar quantidade em 100g" className="h-10 px-3" disabled={isFarmerDifferent}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        )
    }
    
    return (
        <div className="flex w-full items-center gap-2">
            <Button size="icon" variant="outline" onClick={() => handleQuantityChange(-1)} aria-label="Diminuir quantidade" className="h-10 px-3" disabled={isFarmerDifferent}>
                <Minus className="h-4 w-4" />
            </Button>
            <Input 
                type="number" 
                value={quantity} 
                onChange={(e) => {
                    if(handleActionAttempt()){
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                }}
                onFocus={(e) => {
                    if(isFarmerDifferent) {
                        e.target.blur();
                        handleActionAttempt();
                    }
                }}
                className="w-full h-10 text-center font-bold text-xl hide-number-spinners"
                aria-label="Quantidade"
                disabled={isFarmerDifferent}
            />
            <Button size="icon" variant="outline" onClick={() => handleQuantityChange(1)} aria-label="Aumentar quantidade" className="h-10 px-3" disabled={isFarmerDifferent}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
  }

  return (
    <>
      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className={cn("relative rounded-t-lg bg-muted/30", isLojaOrganica ? "aspect-[3/4]" : "aspect-[3/2]")}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl sm:text-xl font-headline text-primary">{product.name}</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 hover:bg-transparent focus-visible:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleToggleFavorite}>
                <Heart className={cn("h-6 w-6", isLocallyFavorite && "fill-red-500 text-red-500")} />
            </Button>
          </div>
          <CardDescription className={cn("text-lg mt-1 font-semibold text-foreground/90 flex-grow", !isExpanded && descriptionNeedsTruncation && "line-clamp-3")}>
            {product.description}
          </CardDescription>
          {descriptionNeedsTruncation && (
              <div className="text-right mt-2">
                <Button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    size="sm"
                    className="h-auto px-3 py-1 text-xs bg-accent text-accent-foreground hover:bg-accent/80"
                >
                    {isExpanded ? 'Ler menos' : 'Ler mais'}
                </Button>
              </div>
          )}
        </CardContent>
         <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                <Tractor className="h-4 w-4 text-primary" />
                <span>Fornecedor: {farmerName}</span>
            </div>
            {responsibleName && (
                 <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold -mt-3">
                    <User className="h-4 w-4 text-primary" />
                    <span>Responsável: {responsibleName}</span>
                </div>
            )}
            <div className="text-lg font-bold text-primary w-full flex justify-between items-center">
                <div>
                <span>R${product.price.toFixed(2).replace('.', ',')}</span>
                <span className="text-base font-medium text-foreground/80 ml-1">/ {product.unit}</span>
                </div>
            </div>
             <div className="w-full flex flex-col gap-2">
                {renderQuantityInput()}
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                           <Button 
                                onClick={handleAddToCartClick} 
                                className={cn(
                                    "w-full text-base font-semibold",
                                      isFarmerDifferent 
                                      ? "bg-muted-foreground text-primary-foreground hover:bg-muted-foreground/80 cursor-pointer"
                                      : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent focus:bg-primary'
                                )}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Adicionar
                            </Button>
                        </TooltipTrigger>
                        {isFarmerDifferent && (
                            <TooltipContent className="max-w-xs text-center p-2" side="top">
                            <p className="font-semibold">
                                Seu pedido atual é com {currentFarmerInCartName}. Clique para ver as opções.
                            </p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </div>
        </CardFooter>
      </Card>

      <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
            <button
                onClick={() => setAlertOpen(false)}
                className="absolute top-2 right-2 p-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-opacity"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
            </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Seu carrinho já contém itens de outro agricultor.</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Seu pedido atual é com <span className="font-bold text-foreground">{currentFarmerInCartName}</span>. As compras são feitas com um agricultor de cada vez.
              <br/><br/>
              Deseja limpar seu carrinho para iniciar um novo pedido com <span className="font-bold text-foreground">{farmerName}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setAlertOpen(false)}>Não, manter meu pedido</Button>
            <Button onClick={confirmAndAdd}>Sim, limpar e adicionar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
