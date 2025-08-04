
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFarmers } from '@/lib/data';
import type { Farmer } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function FarmerSelection() {
  const router = useRouter();
  const allFarmers = getFarmers();
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);

  const handleFarmerSelect = (farmerId: string) => {
    setSelectedFarmerId(farmerId);
  };
  
  const handleViewProducts = (farmerId: string) => {
    router.push(`/products?farmerId=${farmerId}`);
  }

  return (
    <RadioGroup value={selectedFarmerId ?? undefined} onValueChange={handleFarmerSelect}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFarmers.map(farmer => (
          <Label htmlFor={`farmer-${farmer.id}`} key={farmer.id} className="cursor-pointer">
            <Card
              className={`flex flex-col transition-all h-full ${selectedFarmerId === farmer.id ? 'border-primary ring-2 ring-primary' : ''}`}
            >
              <CardHeader>
                <div className="flex flex-row items-center gap-4">
                  <Image src="https://placehold.co/100x100" alt={farmer.name} width={60} height={60} className="rounded-full" data-ai-hint="farmer portrait" />
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{farmer.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                 <CardDescription className="line-clamp-3">{farmer.bio}</CardDescription>
              </CardContent>
              <Separator />
              <CardFooter className="p-4 bg-muted/50 flex-grow flex items-center justify-start gap-4">
                 <RadioGroupItem value={farmer.id} id={`farmer-${farmer.id}`} />
                 <span className="font-semibold text-base">Selecionar este agricultor</span>
              </CardFooter>
              {selectedFarmerId === farmer.id && (
                  <>
                    <Separator />
                    <div className="p-4">
                        <Button className="w-full" onClick={() => handleViewProducts(farmer.id)}>
                            Ver Alimentos
                        </Button>
                    </div>
                  </>
                )}
            </Card>
          </Label>
        ))}
      </div>
    </RadioGroup>
  );
}
