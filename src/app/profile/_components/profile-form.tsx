
"use client";

import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { Customer } from "@/lib/types";

export default function ProfileForm() {
    const { user, isUserLoaded, userType, updateUser } = useUser();
    const { toast } = useToast();
    const [formData, setFormData] = useState<Partial<Customer>>({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            updateUser(formData as Customer);
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
    
    // For now, we only have a profile for the customer
    if (userType !== 'customer') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Perfil do Agricultor</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold text-foreground/90">A funcionalidade de edição de perfil para agricultores ainda não foi implementada.</p>
                </CardContent>
            </Card>
        )
    }

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
                        <Input id="name" value={formData.name || ''} onChange={handleInputChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Telefone / WhatsApp</Label>
                        <Input id="phone" value={formData.phone || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Endereço de Entrega</Label>
                        <Input id="address" value={formData.address || ''} onChange={handleInputChange} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Salvar Alterações</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
