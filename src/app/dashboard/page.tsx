

'use client';

import { getOrders, getProducts, toggleProductPromotion } from "@/lib/data";
import type { Order, Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, Edit, PlusCircle, Trash2, XCircle, ShoppingBag, User, DollarSign, Download, Share2, History, Search, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo, useTransition } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/back-button";

function EditProductForm({ product }: { product: Product }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Produto</DialogTitle>
                    <DialogDescription>
                        Faça alterações nos detalhes do seu produto aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-base">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input id="name" defaultValue={product.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Preço
                        </Label>
                        <Input id="price" type="number" defaultValue={product.price} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="unit" className="text-right">
                            Unidade
                        </Label>
                        <Input id="unit" defaultValue={product.unit} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descrição
                        </Label>
                        <Textarea id="description" defaultValue={product.description} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Foto
                        </Label>
                        <Input id="image" type="file" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Salvar alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ProductsTabContent() {
    const farmerId = '1';
    const [products, setProducts] = useState(() => getProducts().filter(p => p.farmerId === farmerId));
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handlePromotionToggle = (productId: string, checked: boolean) => {
        startTransition(() => {
            toggleProductPromotion(productId, checked);
            setProducts(getProducts().filter(p => p.farmerId === farmerId));
             toast({
                title: checked ? "Produto promovido!" : "Promoção removida",
                description: checked ? "Seu produto agora está na seção de promoções por 7 dias." : "Seu produto não está mais em promoção.",
            });
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Meus Produtos</CardTitle>
                        <CardDescription className="font-semibold">Adicione, edite ou promova produtos do seu inventário.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Adicionar Produto
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="flex flex-col">
                            <div className="relative aspect-video">
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    className="rounded-t-lg object-cover" 
                                    data-ai-hint={product.dataAiHint} 
                                />
                                {product.promotion?.isActive && (
                                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                                        <Tag className="h-3 w-3 mr-1"/>
                                        Promoção
                                    </Badge>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-primary">{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="font-bold text-lg">R${product.price.toFixed(2).replace('.', ',')} <span className="text-base font-medium text-foreground/80">/ {product.unit}</span></p>
                                <p className="text-base font-semibold text-foreground/90 mt-2 line-clamp-3">{product.description}</p>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">
                                <div className="flex items-center space-x-2 w-full justify-center p-2 bg-muted rounded-md">
                                    <Switch
                                        id={`promo-${product.id}`}
                                        checked={product.promotion?.isActive || false}
                                        onCheckedChange={(checked) => handlePromotionToggle(product.id, checked)}
                                        disabled={isPending}
                                    />
                                    <Label htmlFor={`promo-${product.id}`} className="text-sm font-semibold cursor-pointer">
                                        Promover por 7 dias
                                    </Label>
                                </div>
                                <div className="flex w-full gap-2">
                                    <Button variant="outline" className="w-full">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Excluir
                                    </Button>
                                    <EditProductForm product={product} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function OrderHistoryDialog({ allOrders }: { allOrders: Order[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);

    const filteredOrders = useMemo(() => {
        return allOrders.filter(order => {
            const matchesSearchTerm = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDate = !date || format(order.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
            return matchesSearchTerm && matchesDate;
        });
    }, [searchTerm, date, allOrders]);
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <History className="h-4 w-4 mr-2" />
                    Histórico de Pedidos
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Histórico de Pedidos</DialogTitle>
                    <DialogDescription>
                        Pesquise e visualize todos os pedidos anteriores.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col sm:flex-row gap-4 p-4 border-b">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Pesquisar por cliente ou ID..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-full sm:w-[280px] justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                    {date && <Button variant="ghost" onClick={() => setDate(undefined)}>Limpar</Button>}
                </div>
                 <div className="flex-grow overflow-y-auto p-4 space-y-4">
                   {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <Card key={order.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="font-headline text-xl text-primary">{order.id}</CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1 text-lg">
                                                <User className="h-4 w-4"/>
                                                {order.customerName}
                                            </CardDescription>
                                        </div>
                                        <Badge className="text-sm">{order.status}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center text-lg font-bold">
                                       <span className="flex items-center gap-2">
                                         <DollarSign className="h-5 w-5 text-primary"/>
                                         Total do Pedido
                                       </span>
                                        <span>R${order.total.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                   ) : (
                    <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado.</p>
                   )}
                </div>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant="outline">Fechar</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function OrdersTabContent({ orders }: { orders: Order[] }) {
    const getStatusVariant = (status: Order['status']) => {
        switch (status) {
            case 'Pendente':
                return 'secondary';
            case 'Confirmado':
                return 'default';
            case 'Rejeitado':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Pedidos Recebidos</CardTitle>
                        <CardDescription className="font-semibold">Revise e gerencie os pedidos de seus clientes.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length > 0 ? orders.map((order) => (
                    <Card key={order.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="font-headline text-2xl text-primary">{order.id}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1 text-lg">
                                        <User className="h-4 w-4"/>
                                        {order.customerName}
                                    </CardDescription>
                                </div>
                                <Badge variant={getStatusVariant(order.status)} className="text-sm">{order.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <ShoppingBag className="h-5 w-5 text-accent" />
                                    Itens
                                </h4>
                                <ul className="space-y-1 list-disc pl-5 text-lg font-semibold text-foreground/90">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="text-lg">
                                            {item.quantity}x {item.productName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Separator />
                             <div className="flex justify-between items-center text-lg font-bold">
                               <span className="flex items-center gap-2">
                                 <DollarSign className="h-5 w-5 text-primary"/>
                                 Total do Pedido
                               </span>
                                <span>R${order.total.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            {order.status === 'Pendente' && (
                                <div className="flex w-full gap-2">
                                    <Button className="w-full" variant="destructive">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Recusar
                                    </Button>
                                    <Button className="w-full">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Aceitar
                                    </Button>
                                </div>
                            )}
                            <div className="flex w-full gap-2">
                                <Button variant="outline" className="w-full">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    WhatsApp
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Download className="h-4 w-4 mr-2" />
                                    Salvar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                )) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-lg font-semibold text-muted-foreground">Nenhum pedido recebido no momento.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}


export default function DashboardPage() {
    const orders = useMemo(() => getOrders(), []);

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6 flex justify-between items-center">
                <BackButton />
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold font-headline text-primary">Painel do Agricultor</h1>
                    <OrderHistoryDialog allOrders={orders} />
                </div>
            </div>

            <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
                    <TabsTrigger value="orders" className="text-lg font-bold">Pedidos</TabsTrigger>
                    <TabsTrigger value="products" className="text-lg font-bold">Meus Produtos</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <OrdersTabContent orders={orders} />
                </TabsContent>
                <TabsContent value="products">
                    <ProductsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    );
}
