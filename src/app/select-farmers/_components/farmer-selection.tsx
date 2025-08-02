"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFarmers } from '@/lib/data';
import type { Farmer } from '@/lib/types';
import { useUser } from '@/hooks/use-user';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function FarmerSelection() {
  const router = useRouter();
  const { user, isUserLoaded, updateUser } = useUser();
  const allFarmers = getFarmers();
  const [selectedFarmerIds, setSelectedFarmerIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isUserLoaded && user) {
      setSelectedFarmerIds(new Set(user.favoriteFarmerIds));
    }
  }, [isUserLoaded, user]);

  const handleFarmerToggle = (farmerId: string) => {
    setSelectedFarmerIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(farmerId)) {
        newSet.delete(farmerId);
      } else {
        newSet.add(farmerId);
      }
      return newSet;
    });
  };

  const handleSaveChanges = () => {
    if (user) {
      updateUser({ ...user, favoriteFarmerIds: Array.from(selectedFarmerIds) });
      router.push('/');
    }
  };

  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFarmers.map(farmer => (
          <Card
            key={farmer.id}
            className={`cursor-pointer transition-all ${
              selectedFarmerIds.has(farmer.id) ? 'border-primary ring-2 ring-primary' : ''
            }`}
            onClick={() => handleFarmerToggle(farmer.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Image src="https://placehold.co/100x100" alt={farmer.name} width={60} height={60} className="rounded-full" data-ai-hint="farmer portrait" />
              <div className="flex-1">
                <CardTitle className="text-xl">{farmer.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{farmer.bio}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Checkbox
                checked={selectedFarmerIds.has(farmer.id)}
                aria-label={`Select ${farmer.name}`}
                className="mr-2"
              />
              <span className="font-semibold text-base">Seguir este agricultor</span>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button size="lg" onClick={handleSaveChanges} className="font-bold">
          Ver Produtos
        </Button>
      </div>
    </div>
  );
}