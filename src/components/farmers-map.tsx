
"use client";

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import type { Farmer } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

interface FarmersMapProps {
  farmers: Farmer[];
  apiKey: string;
}

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: -22.9068,
  lng: -43.1729
};

const FarmersMap = ({ farmers, apiKey }: FarmersMapProps) => {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {farmers.map(farmer => (
            <Marker
                key={farmer.id}
                position={farmer.location}
                onClick={() => setSelectedFarmer(farmer)}
            />
            ))}

            {selectedFarmer && (
            <InfoWindow
                position={selectedFarmer.location}
                onCloseClick={() => setSelectedFarmer(null)}
            >
                <Card className="border-none shadow-none">
                    <CardHeader className="p-2">
                        <CardTitle className="font-headline text-lg text-primary">{selectedFarmer.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-sm font-semibold text-foreground/90">{selectedFarmer.bio}</p>
                         <Button asChild size="sm" className="w-full mt-4">
                            <Link href={`/products?farmerId=${selectedFarmer.id}`}>Ver Produtos</Link>
                         </Button>
                    </CardContent>
                </Card>
            </InfoWindow>
            )}
        </GoogleMap>
        </LoadScript>
    </div>
  );
};

export default FarmersMap;
