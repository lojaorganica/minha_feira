
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
                            <Label htmlFor="name">Nome da Fazenda / Marca</Label>
                            <Input id="name" value={farmerData.name || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" value={farmerData.bio || ''} onChange={handleInputChange} placeholder="Fale um pouco sobre você e seus produtos..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone / WhatsApp</Label>
                            <Input id="phone" value={farmerData.phone || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="pixKey">Chave PIX</Label>
                            <Input id="pixKey" value={farmerData.pixKey || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="shippingCost">Custo de Frete (Delivery)</Label>
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
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" value={customerData.name || ''} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Telefone / WhatsApp</Label>
                            <Input id="phone" value={customerData.phone || ''} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Endereço de Entrega</Label>
                            <Input id="address" value={customerData.address || ''} onChange={handleInputChange} />
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
