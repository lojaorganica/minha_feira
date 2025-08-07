
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BackButton from "@/components/back-button";
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';

export default function FarmerSecurityCheckPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [accessCode, setAccessCode] = useState('');
    const registrationPassword = process.env.NEXT_PUBLIC_FARMER_REGISTRATION_PASSWORD;

    const handleProceed = () => {
        if (!registrationPassword) {
            toast({
                variant: 'destructive',
                title: 'Erro de Configuração',
                description: 'A senha de cadastro não foi configurada pelo administrador.',
            });
            return;
        }

        if (accessCode === registrationPassword) {
            router.push('/register/farmer');
        } else {
            toast({
                variant: 'destructive',
                title: 'Acesso Negado',
                description: 'A senha de acesso está incorreta. Por favor, tente novamente.',
            });
        }
    };

     if (!registrationPassword) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="font-headline text-4xl mb-4 text-primary">Página de Cadastro de Agricultor</h1>
                 <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md">
                    <p className="text-lg text-foreground/80">
                       A funcionalidade de cadastro de agricultor precisa de uma senha mestra para funcionar.
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                       Por favor, crie um arquivo <code className="font-code bg-muted px-1 py-0.5 rounded">.env.local</code> na raiz do seu projeto e adicione a seguinte linha:
                    </p>
                    <pre className="mt-2 text-left bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="font-code text-foreground">
                        NEXT_PUBLIC_FARMER_REGISTRATION_PASSWORD="SUA_SENHA_MESTRA_AQUI"
                    </code>
                    </pre>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Depois de adicionar a senha, reinicie o servidor de desenvolvimento.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-10rem)] bg-primary/10 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-6 left-6">
                <BackButton />
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Acesso ao Cadastro</CardTitle>
                    <CardDescription>
                        Para prosseguir, insira a senha de segurança fornecida pelo administrador do Circuito.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="access-code">Senha de Acesso</Label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="access-code"
                                type="password"
                                placeholder="********"
                                required
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                className="pl-10"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleProceed();
                                  }
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleProceed}>
                        Prosseguir para o Cadastro
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
