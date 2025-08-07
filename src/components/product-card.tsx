
"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Minus, ShoppingCart, Tractor, Info } from "lucide-react";
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
  const { addToCart, cartFarmerId, handleConfirmClearAndAddToCart, isDifferentFarmer } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const isFarmerDifferent = isDifferentFarmer(product.farmerId);
  const currentFarmerInCartName = cartFarmerId ? getFarmerById(cartFarmerId)?.name : '';

  const handleAddToCartClick = () => {
    // Se o agricultor for diferente, abre o diálogo de confirmação.
    // Isso agora funciona tanto no clique (mobile) quanto no desktop.
    if (isFarmerDifferent) {
      setAlertOpen(true);
      return;
    }

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
    setQuantity(prev => Math.max(1, prev + amount));
  };


  return (
    <>
      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video rounded-t-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-xl font-headline text-primary">{product.name}</CardTitle>
          <CardDescription className="text-base mt-1 font-semibold text-foreground/90">{product.description}</CardDescription>
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
                    <Button size="icon" variant="outline" onClick={() => handleQuantityChange(-1)} aria-label="Diminuir quantidade" className="h-10 w-10 shrink-0">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-10 text-center font-bold text-base"
                        aria-label="Quantidade"
                    />
                    <Button size="icon" variant="outline" onClick={() => handleQuantityChange(1)} aria-label="Aumentar quantidade" className="h-10 w-10 shrink-0">
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
                                    isAdded ? 'bg-accent hover:bg-accent/90' : 'bg-primary',
                                    isFarmerDifferent ? 'bg-muted text-muted-foreground hover:bg-muted cursor-default' : ''
                                )}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Adicionar
                            </Button>
                        </TooltipTrigger>
                        {isFarmerDifferent && (
                            <TooltipContent className="max-w-xs text-center p-2" side="top">
                            <p className="flex items-center gap-2 font-semibold">
                                <Info className="h-5 w-5 shrink-0 text-accent"/>
                                <span>Seu pedido atual é com {currentFarmerInCartName}. Esvazie o carrinho para adicionar este item.</span>
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
          <AlertDialogHeader>
            <AlertDialogTitle>Seu carrinho já contém itens de outro agricultor.</AlertDialogTitle>
            <AlertDialogDescription>
              Seu pedido atual é com <span className="font-bold text-foreground">{currentFarmerInCartName}</span>. As compras são feitas com um agricultor de cada vez.
              <br/><br/>
              Deseja limpar seu carrinho para iniciar um novo pedido com <span className="font-bold text-foreground">{farmerName}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não, manter meu pedido</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAndAdd}>Sim, limpar e adicionar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
