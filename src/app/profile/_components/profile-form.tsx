
"use client";

import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { Customer, Farmer } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const allFairs = ["Tijuca", "Grajaú", "Flamengo", "Laranjeiras", "Botafogo", "Leme"];

export default function ProfileForm() {
    const { user, isUserLoaded, userType, updateUser } = useUser();
    const { toast } = useToast();
    const [formData, setFormData] = useState<Partial<Customer & Farmer>>({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value === '' ? undefined : parseFloat(value) }));
    };

    const handleFairChange = (fair: string) => {
        setFormData(prev => {
            const currentFairs = (prev as Partial<Farmer>).fairs || [];
            const newFairs = currentFairs.includes(fair)
                ? currentFairs.filter(f => f !== fair)
                : [...currentFairs, fair];
            return { ...prev, fairs: newFairs };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            updateUser(formData as Customer | Farmer);
            toast({
                title: "Perfil Atualizado",
                description: "Seus dados foram atualizados com sucesso.",
            });
        }
    };


    if (!isUserLoaded || !user) {
        return (
            <div className="flex justify-center items-center p-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    if (userType === 'farmer') {
        const farmerData = formData as Partial<Farmer>;
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Perfil do Agricultor</CardTitle>
                    <CardDescription>Atualize os dados da sua fazenda ou marca. Essas informações são visíveis para os clientes.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="responsibleName" className="text-base font-semibold">Nome do Agricultor(a) ou Empresário(a) Responsável</Label>
                            <Input id="responsibleName" value={farmerData.responsibleName || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="name" className="text-base font-semibold">Nome da Fazenda / Marca</Label>
                            <Input id="name" value={farmerData.name || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio" className="text-base font-semibold">Bio (Escreva um pouquinho sobre seu sítio ou negócio nas feiras.)</Label>
                            <Textarea id="bio" value={farmerData.bio || ''} onChange={handleInputChange} placeholder="Escreva aqui, em poucas palavras, sobre seu trabalho ou produção." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address" className="text-base font-semibold">Endereço</Label>
                            <Input id="address" value={farmerData.address || ''} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base font-semibold">Feiras onde trabalho</Label>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-md border p-4">
                                {allFairs.map((fair) => (
                                    <div key={fair} className="flex items-center space-x-2">
                                        <Checkbox 
                                        id={`fair-${fair.toLowerCase()}`} 
                                        onCheckedChange={() => handleFairChange(fair)}
                                        checked={farmerData.fairs?.includes(fair)}
                                        />
                                        <Label htmlFor={`fair-${fair.toLowerCase()}`} className="font-normal text-base">{fair}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base font-semibold">Telefone / WhatsApp</Label>
                            <Input id="phone" value={farmerData.phone || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="pixKey" className="text-base font-semibold">Chave PIX</Label>
                            <Input id="pixKey" value={farmerData.pixKey || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="shippingCost" className="text-base font-semibold">Custo de Frete (Delivery)</Label>
                            <Input id="shippingCost" type="number" value={farmerData.shippingCost || ''} onChange={handleNumberInputChange} placeholder="Deixe em branco se não oferecer"/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Salvar Alterações</Button>
                    </CardFooter>
                </form>
            </Card>
        );
    }

    if (userType === 'customer') {
        const customerData = formData as Partial<Customer>;
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Dados do Cliente</CardTitle>
                    <CardDescription>Atualize suas informações pessoais aqui. Elas serão usadas para o delivery dos seus pedidos.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-base font-semibold">Nome Completo</Label>
                            <Input id="name" value={customerData.name || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base font-semibold">Telefone / WhatsApp</Label>
                            <Input id="phone" value={customerData.phone || ''} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-base font-semibold">Endereço de Entrega</Label>
                            <Input id="address" value={customerData.address || ''} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cep" className="text-base font-semibold">CEP</Label>
                            <Input id="cep" value={customerData.cep || ''} onChange={handleInputChange} placeholder="Ex: 22221-010" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Salvar Alterações</Button>
                    </CardFooter>
                </form>
            </Card>
        );
    }

    return null;
}
