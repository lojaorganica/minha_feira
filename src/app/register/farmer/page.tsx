
'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
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
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";
import type { Farmer, CustomerAddress } from "@/lib/types";

const emptyAddress: CustomerAddress = {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
};

export default function FarmerRegisterPage() {
  const router = useRouter();
  const { addFarmer } = useUser();
  const { toast } = useToast();
  const allFairs = ["Tijuca", "Grajaú", "Flamengo", "Laranjeiras", "Botafogo", "Leme"];

  const [fullName, setFullName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [address, setAddress] = useState<CustomerAddress>(emptyAddress);
  const [selectedFairs, setSelectedFairs] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [shippingCost, setShippingCost] = useState('0');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [prepostos, setPrepostos] = useState('');


  const handleFairChange = (fair: string) => {
    setSelectedFairs(prev => 
      prev.includes(fair) ? prev.filter(f => f !== fair) : [...prev, fair]
    );
  };

   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 8) {
           setAddress(prev => ({ ...prev, [id]: numericValue }));
        }
    };
    
     const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const stateValue = value.toUpperCase().replace(/[^A-Z]/g, '');
        if (stateValue.length <= 2) {
             setAddress(prev => ({ ...prev, [id]: stateValue }));
        }
    };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro de Cadastro",
        description: "As senhas não coincidem. Por favor, tente novamente.",
      });
      return;
    }

    if (!fullName || !farmName || !email || !password || !pixKey || !address.street || !address.city) {
       toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios, incluindo o endereço.",
      });
      return;
    }

    const newFarmerData: Omit<Farmer, 'id' | 'location' | 'image'> = {
      responsibleName: fullName,
      name: farmName,
      bio,
      address,
      pixKey,
      shippingCost: parseFloat(shippingCost) || 0,
      phone,
      fairs: selectedFairs,
      prepostos: prepostos.split(',').map(p => p.trim()).filter(p => p.length > 0),
    };

    const newFarmer = addFarmer(newFarmerData);
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: `Bem-vindo, ${newFarmer.name}!`,
    });

    router.push('/dashboard');
  };

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-10rem)] bg-primary/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-6 left-6">
            <BackButton />
        </div>
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Cadastro de Agricultor</CardTitle>
                <CardDescription>
                Preencha os dados abaixo para criar sua conta de parceiro.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="full-name">Nome Completo</Label>
                    <Input id="full-name" placeholder="Seu nome completo" required className="bg-background" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="farm-name">Nome da Fazenda / Marca</Label>
                    <Input id="farm-name" placeholder="Ex: Fazenda Vale Verde" required className="bg-background" value={farmName} onChange={e => setFarmName(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="prepostos">Prepostos (separe os nomes por vírgula)</Label>
                    <Textarea id="prepostos" placeholder="Ex: Maria, João, etc." className="bg-background" value={prepostos} onChange={e => setPrepostos(e.target.value)} />
                </div>
                
                 <div className="space-y-2">
                    <Label className="text-base font-semibold">Endereço da Propriedade</Label>
                     <div className="grid grid-cols-1 gap-4 rounded-md border p-4 bg-background">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1 col-span-2">
                                <Label htmlFor="street">Logradouro</Label>
                                <Input id="street" value={address.street} onChange={handleAddressChange} placeholder="Ex: Estrada Principal" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="number">Número</Label>
                                <Input id="number" value={address.number} onChange={handleAddressChange} placeholder="S/N" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input id="complement" value={address.complement} onChange={handleAddressChange} placeholder="Ex: Sítio, Lote, Km" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1 col-span-2">
                                <Label htmlFor="neighborhood">Bairro/Localidade</Label>
                                <Input id="neighborhood" value={address.neighborhood} onChange={handleAddressChange} placeholder="Ex: Zona Rural" />
                            </div>
                            <div className="space-y-1">
                                 <Label htmlFor="zipCode">CEP</Label>
                                 <Input id="zipCode" value={address.zipCode} onChange={handleZipCodeChange} placeholder="Somente números" />
                            </div>
                        </div>
                         <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1 col-span-2">
                                <Label htmlFor="city">Cidade</Label>
                                <Input id="city" value={address.city} onChange={handleAddressChange} placeholder="Ex: Teresópolis"/>
                            </div>
                            <div className="space-y-1">
                                 <Label htmlFor="state">Estado</Label>
                                 <Input id="state" value={address.state} onChange={handleStateChange} placeholder="RJ" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Feiras onde trabalho</Label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {allFairs.map((fair) => (
                            <div key={fair} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`fair-${fair.toLowerCase()}`} 
                                  onCheckedChange={() => handleFairChange(fair)}
                                  checked={selectedFairs.includes(fair)}
                                />
                                <Label htmlFor={`fair-${fair.toLowerCase()}`} className="font-normal">{fair}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="grid gap-2">
                    <Label htmlFor="phone">Celular</Label>
                    <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" required className="bg-background" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="pix-key">Chave PIX</Label>
                    <Input id="pix-key" placeholder="CPF, CNPJ, e-mail, celular, etc." required className="bg-background" value={pixKey} onChange={e => setPixKey(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="shipping-cost">Custo de Frete (Delivery)</Label>
                    <Input id="shipping-cost" type="number" placeholder="15.00" required className="bg-background" value={shippingCost} onChange={e => setShippingCost(e.target.value)} />
                     <p className="text-sm text-muted-foreground">Defina aqui seu custo de frete para Delivery no Rio de Janeiro. Deixe 0 se não oferecer.</p>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required className="bg-background" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" required className="bg-background" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirmar Senha</Label>
                        <Input id="confirm-password" type="password" required className="bg-background" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="bio">Fale um tiquinho sobre você, seu trabalho, seu sítio e produção.</Label>
                    <Textarea id="bio" placeholder="Ex: Minha paixão é o cultivo de orgânicos, minha fazenda fica em..." maxLength={300} className="bg-background" value={bio} onChange={e => setBio(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleSubmit}>
                    Cadastrar e Entrar
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
