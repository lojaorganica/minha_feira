"use client";

import type { Farmer } from "@/lib/types";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

interface FarmersMapProps {
    farmers: Farmer[];
    apiKey: string;
}

const FarmersMap = ({ farmers, apiKey }: FarmersMapProps) => {
    const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

    const center = { lat: 34.0522, lng: -118.2437 }; // Centered on LA

    return (
        <div style={{ height: "70vh", width: "100%" }}>
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={center}
                    defaultZoom={9}
                    mapId="verdant-market-map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {farmers.map((farmer) => (
                        <AdvancedMarker
                            key={farmer.id}
                            position={farmer.location}
                            onClick={() => setSelectedFarmer(farmer)}
                        >
                             <div className="w-8 h-8 rounded-full bg-primary border-2 border-background shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13H2a9 9 0 0 0 18 0h-2a7 7 0 0 1-7 7Z"></path><path d="M12 13V3"></path><path d="M15 6l-3-3-3 3"></path></svg>
                            </div>
                        </AdvancedMarker>
                    ))}

                    {selectedFarmer && (
                        <InfoWindow
                            position={selectedFarmer.location}
                            onCloseClick={() => setSelectedFarmer(null)}
                        >
                            <div className="p-2 max-w-xs">
                                <h3 className="font-headline text-lg text-primary">{selectedFarmer.name}</h3>
                                <p className="text-sm text-foreground/80">{selectedFarmer.bio}</p>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </div>
    );
}

export default FarmersMap;
