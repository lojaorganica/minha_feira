
"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Minus, ShoppingCart, Tractor } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  farmerName: string;
}

const ProductCard = ({ product, farmerName }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      toast({
        title: "Adicionado ao carrinho",
        description: `${quantity} x ${product.name} foi adicionado ao seu carrinho.`,
      });
      setQuantity(1);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 500);
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };


  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          data-ai-hint={product.dataAiHint}
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline text-primary">{product.name}</CardTitle>
        <CardDescription className="text-base mt-1 h-12 overflow-hidden font-semibold text-foreground/90">{product.description}</CardDescription>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground font-semibold">
            <Tractor className="h-4 w-4 text-primary" />
            <span>Fornecedor: {farmerName}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start gap-4">
        <div className="text-lg font-bold text-primary w-full flex justify-between items-center">
          <div>
            <span>R${product.price.toFixed(2).replace('.', ',')}</span>
            <span className="text-base font-medium text-foreground/80 ml-1">/ {product.unitAmount ? `${product.unitAmount} ` : ''}{product.unit}</span>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => handleQuantityChange(-1)} aria-label="Diminuir quantidade">
                    <Minus className="h-4 w-4" />
                </Button>
                <Input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 text-center font-bold text-base"
                    aria-label="Quantidade"
                />
                <Button size="icon" variant="outline" onClick={() => handleQuantityChange(1)} aria-label="Aumentar quantidade">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <Button 
                onClick={handleAddToCart} 
                className={cn(
                    "flex-grow text-base font-semibold transition-colors duration-200",
                    isAdded ? 'bg-accent hover:bg-accent/90' : 'bg-primary'
                )}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
