
'use client';

import { useState, useMemo } from 'react';
import { getOrders, getCustomers, updateCustomerClassification } from '@/lib/data';
import type { Order, Customer, CustomerClassification } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BackButton from '@/components/back-button';
import { Home, Mail, Phone, User, Award, Gem, Medal, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const classificationConfig: Record<CustomerClassification, {
    label: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
}> = {
    bronze: { label: 'Bronze', icon: Shield, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    prata: { label: 'Prata', icon: Medal, color: 'text-gray-600', bgColor: 'bg-gray-200' },
    ouro: { label: 'Ouro', icon: Award, color: 'text-amber-500', bgColor: 'bg-amber-100' },
    diamante: { label: 'Diamante', icon: Gem, color: 'text-sky-500', bgColor: 'bg-sky-100' },
};


function CustomerClassificationBadge({ classification }: { classification?: CustomerClassification }) {
    if (!classification) {
        return <p className="text-sm font-bold text-muted-foreground">Sem classificação</p>;
    }

    const { label, icon: Icon, color, bgColor } = classificationConfig[classification];

    return (
        <div className={cn("flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold", color, bgColor)}>
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </div>
    );
}

export default function MyCustomersPage() {
    // Usando estado para permitir a atualização da UI
    const [customers, setCustomers] = useState(() => getCustomers());
    const { toast } = useToast();

    const handleClassificationChange = (customerId: string, newClassification: CustomerClassification) => {
        updateCustomerClassification(customerId, newClassification);
        setCustomers(prevCustomers => 
            prevCustomers.map(c => 
                c.id === customerId ? { ...c, classification: newClassification } : c
            )
        );
        toast({
            title: "Classificação Atualizada",
            description: `O cliente foi classificado como ${classificationConfig[newClassification].label}.`,
        });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4">
                <BackButton />
            </div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Meus Clientes
                </h1>
                <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">Gerencie e classifique seus clientes para fortalecer o relacionamento e identificar seus compradores mais fiéis.</p>
            </div>

            {customers.length === 0 ? (
                <div className="text-center py-20">
                    <User className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-semibold">Nenhum cliente encontrado</h2>
                    <p className="text-lg font-semibold text-foreground/90 mt-2">Você ainda não tem clientes que fizeram pedidos.</p>
                </div>
            ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customers.map((customer) => (
                        <Card key={customer.id} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={customer.image} data-ai-hint="person portrait" />
                                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="font-headline text-primary text-xl">{customer.name}</CardTitle>
                                    <div className="mt-2">
                                       <CustomerClassificationBadge classification={customer.classification} />
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-6 space-y-3 text-base font-semibold text-foreground/90 flex-grow">
                               <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-accent"/>
                                    <span>{customer.phone || 'Não informado'}</span>
                               </div>
                               <div className="flex items-start gap-3">
                                    <Home className="h-5 w-5 text-accent mt-1"/>
                                    <span>{customer.address || 'Não informado'}</span>
                               </div>
                            </CardContent>
                            <CardFooter className="bg-muted/50 p-4">
                               <div className="w-full space-y-2">
                                 <Label htmlFor={`classification-${customer.id}`} className="font-bold text-sm text-foreground/80">Classificar Cliente:</Label>
                                  <Select 
                                    defaultValue={customer.classification} 
                                    onValueChange={(value) => handleClassificationChange(customer.id, value as CustomerClassification)}
                                  >
                                    <SelectTrigger id={`classification-${customer.id}`} className="w-full bg-background font-bold">
                                        <SelectValue placeholder="Definir classificação..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(Object.keys(classificationConfig) as CustomerClassification[]).map((key) => {
                                            const { label, icon: Icon } = classificationConfig[key];
                                            return (
                                                <SelectItem key={key} value={key} className="font-bold text-base">
                                                    <div className="flex items-center gap-2">
                                                        <Icon className="h-4 w-4" />
                                                        <span>{label}</span>
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                               </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
