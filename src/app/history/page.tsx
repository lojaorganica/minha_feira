
'use client';

import { useOrderHistory } from "@/hooks/use-order-history";
import { Loader2, ShoppingBag, Calendar, User, Truck, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BackButton from "@/components/back-button";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Separator } from "@/components/ui/separator";

export default function OrderHistoryPage() {
    const { orders, isLoaded } = useOrderHistory();

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center p-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <BackButton />
            </div>
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl mb-8">
                Histórico de Pedidos
            </h1>

            {orders.length === 0 ? (
                <div className="text-center py-20">
                    <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-semibold">Nenhum pedido encontrado</h2>
                    <p className="text-lg font-semibold text-foreground/90 mt-2">Você ainda não fez nenhum pedido.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="bg-muted/50">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                    <div>
                                        <CardTitle className="font-headline text-xl text-primary">Pedido {order.id.split('-')[1]}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1 font-semibold">
                                            <Calendar className="h-4 w-4" />
                                            {format(new Date(order.date), "dd 'de' MMMM 'de' yyyy, 'às' HH:mm", { locale: ptBR })}
                                        </CardDescription>
                                    </div>
                                     <div className="text-right">
                                        <p className="text-xl font-bold text-primary">R${order.total.toFixed(2).replace('.', ',')}</p>
                                        <p className="text-sm font-semibold text-muted-foreground">{order.status}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-lg">Vendido por: {order.farmerName}</h4>
                                    </div>
                                    <ul className="space-y-2 pl-2">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex justify-between items-center text-lg font-semibold text-foreground/90">
                                                <span>{item.quantity}x {item.productName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Separator />
                                <div>
                                    {order.deliveryOption === 'pickup' && order.pickupLocation && (
                                        <div className="flex items-center gap-2 font-semibold text-lg text-foreground/90">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            <span>Retirar em: {order.pickupLocation}</span>
                                        </div>
                                    )}
                                     {order.deliveryOption === 'delivery' && (
                                        <div className="flex items-center gap-2 font-semibold text-lg text-foreground/90">
                                            <Truck className="h-5 w-5 text-primary" />
                                            <span>Entrega via Delivery</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}


    
