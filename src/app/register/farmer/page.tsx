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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function FarmerRegisterPage() {
  const fairs = ["Tijuca", "Grajaú", "Flamengo", "Laranjeiras", "Botafogo", "Leme"];

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-10rem)] bg-primary/10 py-12">
        <div className="absolute top-6 left-6">
            <BackButton />
        </div>
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Cadastro de Agricultor</CardTitle>
                <CardDescription>
                Preencha os dados abaixo para criar sua conta de parceiro.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="full-name">Nome Completo</Label>
                    <Input id="full-name" placeholder="Seu nome completo" required className="bg-background" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="farm-name">Nome da Fazenda / Marca</Label>
                    <Input id="farm-name" placeholder="Ex: Fazenda Vale Verde" required className="bg-background" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Seu endereço completo" required className="bg-background" />
                </div>

                <div className="grid gap-2">
                    <Label>Feiras onde trabalho</Label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {fairs.map((fair) => (
                            <div key={fair} className="flex items-center space-x-2">
                                <Checkbox id={`fair-${fair.toLowerCase()}`} />
                                <Label htmlFor={`fair-${fair.toLowerCase()}`} className="font-normal">{fair}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="grid gap-2">
                    <Label htmlFor="phone">Celular</Label>
                    <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" required className="bg-background" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="pix-key">Chave PIX</Label>
                    <Input id="pix-key" placeholder="CPF, CNPJ, e-mail, celular, etc." required className="bg-background" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="shipping-cost">Custo de Frete (Delivery)</Label>
                    <Input id="shipping-cost" type="number" placeholder="15.00" required className="bg-background" />
                     <p className="text-sm text-muted-foreground">Defina aqui seu custo de frete para Delivery no Rio de Janeiro. Deixe 0 se não oferecer.</p>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required className="bg-background" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" required className="bg-background" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirmar Senha</Label>
                        <Input id="confirm-password" type="password" required className="bg-background" />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="bio">Fale um tiquinho sobre você, seu trabalho, seu sítio e produção.</Label>
                    <Textarea id="bio" placeholder="Ex: Minha paixão é o cultivo de orgânicos, minha fazenda fica em..." maxLength={300} className="bg-background" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" asChild>
                    <Link href="/dashboard">Cadastrar e Entrar</Link>
                </Button>
                 <div className="text-center text-sm">
                    Já tem uma conta?{" "}
                    <Link href="/login/farmer" className="underline">
                        Faça Login
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}
