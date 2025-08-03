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

export default function FarmerLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-primary/10">
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
                <Input id="email" type="email" placeholder="m@exemplo.com" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" asChild>
                    <Link href="/dashboard">Entrar</Link>
                </Button>
                 <div className="text-center text-sm">
                    Ainda não é um parceiro?{" "}
                    <Link href="#" className="underline">
                        Cadastre-se
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}
