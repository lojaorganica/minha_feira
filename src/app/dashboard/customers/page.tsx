
'use client';

import { useMemo } from 'react';
import { getOrders, getCustomers } from '@/lib/data';
import type { Order, Customer } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BackButton from '@/components/back-button';
import { Home, Mail, Phone, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function getCustomerDetails(customerId: string): Customer | undefined {
    // In a real app, this would be an efficient DB lookup.
    // For now, we find the customer in our mock data.
    const allCustomers = getCustomers(); 
    // This is a placeholder, as we don't have multiple customers yet.
    // We will find by name for this example.
    const customer = allCustomers.find(c => c.name === customerId);
    if(customer) return customer;
    
    // Fallback for mock data that might not be in the customers array
    const orders = getOrders();
    const order = orders.find(o => o.customerName === customerId);
    if (order && order.customerContact) {
        return {
            id: `cust-${Math.random()}`,
            name: order.customerName,
            address: order.customerContact.address,
            phone: order.customerContact.phone,
            favoriteFarmerIds: [],
            image: 'https://placehold.co/100x100.png'
        };
    }

    return undefined;
}


export default function MyCustomersPage() {
    const farmerId = '1'; // Placeholder for logged-in farmer

    const customers = useMemo(() => {
        const farmerOrders = getOrders().filter(order => {
            // In a real app, orders would have a farmerId. We simulate this.
            // Let's assume all orders could be from any farmer for now,
            // and we'll just show all customers who have ordered.
            // This logic would be more specific with a real database.
            return true; 
        });

        const customerNames = [...new Set(farmerOrders.map(order => order.customerName))];

        return customerNames.map(name => getCustomerDetails(name)).filter((c): c is Customer => Boolean(c));
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <BackButton />
            </div>
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl mb-8">
                Meus Clientes
            </h1>

            {customers.length === 0 ? (
                <div className="text-center py-20">
                    <User className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-semibold">Nenhum cliente encontrado</h2>
                    <p className="text-lg font-semibold text-foreground/90 mt-2">Você ainda não tem clientes que fizeram pedidos.</p>
                </div>
            ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customers.map((customer) => (
                        <Card key={customer.id}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={customer.image} data-ai-hint="person portrait" />
                                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="font-headline text-primary text-xl">{customer.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-6 space-y-3 text-base font-semibold text-foreground/90">
                               <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-accent"/>
                                    <span>{customer.phone || 'Não informado'}</span>
                               </div>
                               <div className="flex items-start gap-3">
                                    <Home className="h-5 w-5 text-accent mt-1"/>
                                    <span>{customer.address || 'Não informado'}</span>
                               </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
