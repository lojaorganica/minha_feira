
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFarmers } from '@/lib/data';
import type { Farmer } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { AlertCircle, ShoppingCart, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function FarmerSelection() {
  const router = useRouter();
  const allFarmers = getFarmers();
  const { cartFarmerId, currentFarmerInCartName, clearCart } = useCart();
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(cartFarmerId);
  const isCartActive = !!cartFarmerId;

  useEffect(() => {
    // Garante que a seleção reflita o estado do carrinho quando o componente monta
    setSelectedFarmerId(cartFarmerId);
  }, [cartFarmerId]);


  const handleFarmerSelect = (farmerId: string) => {
    // Se o carrinho estiver ativo com outro agricultor, não faz nada.
    if (isCartActive && farmerId !== cartFarmerId) {
      return;
    }

    // Se o carrinho estiver ativo e o cliente tentar desmarcar o agricultor do carrinho, não faz nada.
    if (isCartActive && selectedFarmerId === farmerId) {
        return;
    }

    // Lógica de toggle: se clicar no mesmo, deseleciona (só se o carrinho estiver vazio). Senão, seleciona o novo.
    setSelectedFarmerId(prevId => (prevId === farmerId ? null : farmerId));
  };
  
  const handleViewProducts = (farmerId: string) => {
    router.push(`/catalog?farmerId=${farmerId}`);
  }

  const handleClearCartAndContinue = () => {
    clearCart();
    // O useEffect cuidará de atualizar o selectedFarmerId para null
  }

  return (
    <>
      {isCartActive && currentFarmerInCartName && (
        <Alert className="mb-8 border-primary/50 text-primary">
          <ShoppingCart className="h-4 w-4 !text-primary" />
          <AlertTitle className="font-headline">Você tem um pedido em andamento!</AlertTitle>
          <AlertDescription className="font-semibold text-primary/90">
            Seu carrinho atual é com <span className="font-bold">{currentFarmerInCartName}</span>. 
            Você pode continuar comprando com este agricultor ou <Button variant="link" className="p-0 h-auto text-base text-primary font-bold" onClick={handleClearCartAndContinue}>limpar o carrinho</Button> para escolher outro.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFarmers.map(farmer => {
          const isThisFarmerInCart = isCartActive && farmer.id === cartFarmerId;
          const isDisabled = isCartActive && !isThisFarmerInCart;
          const isSelected = selectedFarmerId === farmer.id;

          return (
            <div 
              key={farmer.id} 
              onClick={() => handleFarmerSelect(farmer.id)}
              className={cn(
                  'cursor-pointer transition-opacity',
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-100',
                  isCartActive && !isThisFarmerInCart ? '' : 'hover:shadow-lg hover:-translate-y-1'
              )}
            >
              <Card
                className={cn(
                  'flex flex-col transition-all h-full', 
                  isSelected ? 'border-primary ring-2 ring-primary' : '',
                  isDisabled ? '' : 'cursor-pointer'
                )}
              >
                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Image src={farmer.image} alt={farmer.name} width={60} height={60} className="rounded-full object-cover" data-ai-hint="farmer portrait" />
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{farmer.name}</CardTitle>
                      {farmer.responsibleName && (
                          <p className="text-sm font-semibold text-foreground/80 mt-1">
                              Responsável: {farmer.responsibleName}
                          </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{farmer.bio}</CardDescription>
                </CardContent>
                <Separator />
                <CardFooter className="p-4 bg-muted/50 flex-grow flex items-center justify-start gap-4">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    isSelected ? "bg-primary border-primary" : "bg-background border-muted-foreground/50"
                  )}>
                    {isSelected && <CheckCircle className="h-5 w-5 text-primary-foreground" />}
                  </div>
                  <span className="font-semibold text-base">
                    {isSelected ? "Selecionado" : "Selecionar este agricultor"}
                  </span>
                </CardFooter>
                {isSelected && (
                    <>
                      <Separator />
                      <div className="p-4">
                          <Button className="w-full" onClick={(e) => {
                            e.stopPropagation(); // Evita que o clique no botão deselecione o card
                            handleViewProducts(farmer.id);
                          }}>
                              Ver Alimentos
                          </Button>
                      </div>
                    </>
                  )}
              </Card>
            </div>
          )
        })}
      </div>
    </>
  );
}
