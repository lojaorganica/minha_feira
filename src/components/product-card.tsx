
"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Minus, ShoppingCart, Tractor, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { getFarmerById } from "@/lib/data";


interface ProductCardProps {
  product: Product;
  farmerName: string;
}

const ProductCard = ({ product, farmerName }: ProductCardProps) => {
  const { addToCart, cartFarmerId, handleConfirmClearAndAddToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const isFarmerDifferent = cartFarmerId !== null && product.farmerId !== cartFarmerId;
  const currentFarmerInCartName = cartFarmerId ? getFarmerById(cartFarmerId)?.name : '';

  const handleActionAttempt = () => {
    if (isFarmerDifferent) {
      setAlertOpen(true);
      return false; // Indica que a ação foi bloqueada
    }
    return true; // Indica que a ação pode prosseguir
  };

  const handleAddToCartClick = () => {
    if (isAdded) return; // Impede cliques múltiplos se já foi adicionado
    if (!handleActionAttempt()) return;

    if (quantity > 0) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const confirmAndAdd = () => {
    handleConfirmClearAndAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    setAlertOpen(false);
  }

  const handleQuantityChange = (amount: number) => {
    if (!handleActionAttempt()) return;
    setQuantity(prev => Math.max(1, prev + amount));
  };


  return (
    <>
      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-xl font-headline text-primary">{product.name}</CardTitle>
          <CardDescription className="text-base mt-1 font-semibold text-foreground/90 flex-grow">{product.description}</CardDescription>
        </CardContent>
         <CardFooter className="p-4 mt-auto flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                <Tractor className="h-4 w-4 text-primary" />
                <span>Fornecedor: {farmerName}</span>
            </div>
            <div className="text-lg font-bold text-primary w-full flex justify-between items-center">
                <div>
                <span>R${product.price.toFixed(2).replace('.', ',')}</span>
                <span className="text-base font-medium text-foreground/80 ml-1">/ {product.unitAmount ? `${product.unitAmount} ` : ''}{product.unit}</span>
                </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-1">
                    <Button size="icon" variant="outline" onClick={() => handleQuantityChange(-1)} aria-label="Diminuir quantidade" className="h-10 w-10 shrink-0" disabled={isFarmerDifferent}>
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
                        className="w-16 h-10 text-center font-bold text-base"
                        aria-label="Quantidade"
                        disabled={isFarmerDifferent}
                    />
                    <Button size="icon" variant="outline" onClick={() => handleQuantityChange(1)} aria-label="Aumentar quantidade" className="h-10 w-10 shrink-0" disabled={isFarmerDifferent}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                           <Button 
                                onClick={handleAddToCartClick} 
                                className={cn(
                                    "w-full text-base font-semibold transition-colors duration-200",
                                    isAdded 
                                      ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                                      : isFarmerDifferent 
                                      ? "bg-muted-foreground text-primary-foreground hover:bg-muted-foreground/80 cursor-pointer"
                                      : 'bg-primary'
                                )}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {isAdded ? "Adicionado!" : "Adicionar"}
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
             <AlertDialogCancel asChild>
                <button className="absolute top-2 right-2 p-1 h-auto rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-opacity">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar</span>
                </button>
            </AlertDialogCancel>
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
            <AlertDialogAction onClick={confirmAndAdd}>Sim, limpar e adicionar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
