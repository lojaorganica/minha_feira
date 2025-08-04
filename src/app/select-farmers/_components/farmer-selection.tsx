
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFarmers } from '@/lib/data';
import type { Farmer } from '@/lib/types';
import { useUser } from '@/hooks/use-user';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function FarmerSelection() {
  const router = useRouter();
  const { user, isUserLoaded, updateUser } = useUser();
  const allFarmers = getFarmers();
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);

  useEffect(() => {
    if (isUserLoaded && user && user.favoriteFarmerIds.length > 0) {
      setSelectedFarmerId(user.favoriteFarmerIds[0]);
    }
  }, [isUserLoaded, user]);

  const handleFarmerSelect = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
    if (user) {
        // Salva a seleção imediatamente para que o catálogo seja atualizado
      updateUser({ ...user, favoriteFarmerIds: [farmerId] });
    }
  };
  
  const handleViewProducts = () => {
    if (selectedFarmerId) {
        router.push(`/products?farmerId=${selectedFarmerId}`);
    }
  }


  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <RadioGroup value={selectedFarmerId ?? undefined} onValueChange={handleFarmerSelect}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFarmers.map(farmer => (
            <Label htmlFor={`farmer-${farmer.id}`} key={farmer.id} className="cursor-pointer">
              <Card
                className={`flex flex-col transition-all h-full ${selectedFarmerId === farmer.id ? 'border-primary ring-2 ring-primary' : ''}`}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Image src="https://placehold.co/100x100" alt={farmer.name} width={60} height={60} className="rounded-full" data-ai-hint="farmer portrait" />
                  <div className="flex-1">
                    <CardTitle className="text-xl">{farmer.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">{farmer.bio}</CardDescription>
                  </div>
                </CardHeader>
                <Separator />
                <CardFooter className="p-4 bg-muted/50 flex-grow flex items-center justify-start gap-4">
                  <RadioGroupItem value={farmer.id} id={`farmer-${farmer.id}`} />
                  <span className="font-semibold text-base">Selecionar este agricultor</span>
                </CardFooter>
              </Card>
            </Label>
          ))}
        </div>
      </RadioGroup>
      <div className="mt-8 text-center">
        <Button size="lg" onClick={handleViewProducts} disabled={!selectedFarmerId}>
          Ver Produtos do Agricultor Selecionado
        </Button>
      </div>
    </div>
  );
}
