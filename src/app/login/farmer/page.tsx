
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import BackButton from "@/components/back-button"
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { getFarmers } from "@/lib/data";
import type { Farmer } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from 'lucide-react';

export default function FarmerLoginPage() {
  const { login } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const allFarmers = getFarmers();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (farmerId: string) => {
    login(farmerId, 'farmer');
    router.push('/dashboard');
  };

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-10rem)] bg-primary/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-6 left-6">
            <BackButton />
        </div>
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Login do Agricultor (Simulação)</CardTitle>
                <CardDescription>
                Selecione um agricultor abaixo para acessar o painel de controle correspondente.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {!isClient ? (
                <div className="flex justify-center items-center h-48">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-3">
                  {allFarmers.map((farmer, index) => (
                    <>
                      <div key={farmer.id} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-lg">{farmer.name}</p>
                          <p className="text-sm text-muted-foreground">{farmer.responsibleName || 'Responsável não definido'}</p>
                        </div>
                        <Button onClick={() => handleLogin(farmer.id)}>
                            Entrar como {farmer.name.split(' ')[0]}
                        </Button>
                      </div>
                      {index < allFarmers.length - 1 && <Separator />}
                    </>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                 <div className="text-center text-sm">
                    Ainda não é um parceiro?{" "}
                    <Link href="/register/farmer/security-check" className="underline">
                        Cadastre-se
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}
