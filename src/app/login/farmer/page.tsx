
'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import BackButton from "@/components/back-button"
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

export default function FarmerLoginPage() {
  const { login } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    // Para fins de protótipo, faz o login do primeiro agricultor
    login('1', 'farmer');
    router.push('/dashboard');
  };

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-10rem)] bg-primary/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-6 left-6">
            <BackButton />
        </div>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Login do Agricultor</CardTitle>
                <CardDescription>
                Acesse o painel para gerenciar seus produtos e pedidos.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="m@exemplo.com" required defaultValue="agricultor@exemplo.com" />
                </div>
                <div className="grid gap-2">
                   <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Input id="password" type="password" required defaultValue="senha123" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleLogin}>
                    Entrar
                </Button>
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
