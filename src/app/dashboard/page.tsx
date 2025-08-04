

'use client';

import { Suspense, useState, useMemo, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getOrders, getProducts, toggleProductPromotion, updateProduct } from "@/lib/data";
import type { Order, Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Edit, PlusCircle, Trash2, ShoppingBag, User, DollarSign, Download, Share2, History, Search, Tag, CalendarIcon, Truck, Phone, Home, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/back-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

function getFairDisplayName(fair: string): string {
    const doExceptions = ['Grajaú', 'Flamengo', 'Leme'];
    if (doExceptions.includes(fair)) {
        return `Feira do ${fair}`;
    }
    const deExceptions = ['Laranjeiras'];
    if (deExceptions.includes(fair)) {
        return `Feira de ${fair}`;
    }
    return `Feira da ${fair}`;
}

// Componente Isolado para Edição de Produto
function EditProductForm({ product: initialProduct, onSaveChanges }: { product: Product, onSaveChanges: () => void }) {
    const [product, setProduct] = useState<Product>(initialProduct);
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProduct(prev => ({ ...prev, [id]: value }));
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setProduct(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
    };

    const handleSubmit = () => {
        setIsSaving(true);
        updateProduct(product.id, {
            name: product.name,
            price: product.price,
            unit: product.unit,
            description: product.description,
        });
        setTimeout(() => {
            onSaveChanges();
            setIsSaving(false);
            setIsOpen(false);
            toast({
                title: "Produto atualizado!",
                description: `${product.name} foi modificado com sucesso.`,
            });
        }, 500); // Simula o tempo de salvamento
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Editar Produto</DialogTitle>
                    <DialogDescription>
                        Faça alterações nos detalhes do seu produto aqui. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-base">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome do Produto</Label>
                        <Input id="name" value={product.name} onChange={handleInputChange} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Preço (R$)</Label>
                            <Input id="price" type="number" value={product.price} onChange={handleNumberInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unidade</Label>
                            <Select value={product.unit} onValueChange={(value) => setProduct(p => ({...p, unit: value}))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kg">por kg</SelectItem>
                                    <SelectItem value="g">por g</SelectItem>
                                    <SelectItem value="unidade">unidade</SelectItem>
                                    <SelectItem value="maço">maço</SelectItem>
                                    <SelectItem value="dúzia">dúzia</SelectItem>
                                    <SelectItem value="litro">litro</SelectItem>
                                    <SelectItem value="molho">molho</SelectItem>
                                    <SelectItem value="caixa">caixa</SelectItem>
                                    <SelectItem value="pote">pote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" value={product.description} onChange={handleInputChange} placeholder="Descreva seu produto..." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="image">Foto</Label>
                        <Input id="image" type="file" disabled />
                        <p className="text-sm text-muted-foreground">A troca de imagem do produto não está disponível no protótipo.</p>
                    </div>
                </div>
                <DialogFooter>
                      <Button type="button" onClick={handleSubmit} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar alterações
                      </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Componente Isolado para a Aba de Produtos
function ProductsTabContent({ allProducts, onProductUpdate }: { allProducts: Product[], onProductUpdate: () => void }) {
    const farmerId = '1';
    const products = allProducts.filter(p => p.farmerId === farmerId);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handlePromotionToggle = (productId: string, checked: boolean) => {
        startTransition(() => {
            toggleProductPromotion(productId, checked);
            onProductUpdate();
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
                        <CardDescription>Adicione, edite ou promova produtos do seu inventário.</CardDescription>
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
                                    <EditProductForm product={product} onSaveChanges={onProductUpdate} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Componente Isolado para a Aba de Pedidos
function OrdersTabContent({ orders }: { orders: Order[] }) {

    return (
        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Pedidos Recebidos</CardTitle>
                        <CardDescription>Revise e gerencie os pedidos de seus clientes.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length > 0 ? orders.map((order) => (
                    <Card key={order.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="font-headline text-2xl text-primary">{order.id.split('-')[1]}</CardTitle>
                                    <CardDescription className="text-base font-semibold text-foreground/90 flex items-center gap-2 mt-1">
                                        <User className="h-4 w-4"/>
                                        {order.customerName}
                                    </CardDescription>
                                </div>
                                <Badge className={`text-sm ${
                                    order.status === 'Pendente' 
                                        ? 'bg-amber-500 text-white hover:bg-amber-500' 
                                        : order.status === 'Confirmado' 
                                        ? 'bg-blue-600 text-white hover:bg-blue-600'
                                        : 'bg-destructive text-destructive-foreground'
                                }`}>
                                    {order.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                             <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-base">
                                    <ShoppingBag className="h-5 w-5 text-accent" />
                                    Itens
                                </h4>
                                <ul className="space-y-1 list-disc pl-5 font-semibold text-foreground/90">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="text-base">
                                            {item.quantity}x {item.productName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Separator />

                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-base">
                                    <Truck className="h-5 w-5 text-accent" />
                                    Entrega
                                </h4>
                                <div className="text-base font-semibold text-foreground/90 pl-1">
                                    {order.deliveryOption === 'pickup' && order.pickupLocation ? (
                                        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />Retirar na {order.pickupLocation}</p>
                                    ) : (
                                        <div className="space-y-1">
                                            <p className="font-bold">Delivery</p>
                                            {order.customerContact && (
                                                <>
                                                    <p className="flex items-center gap-2"><Home className="h-4 w-4" />{order.customerContact.address}</p>
                                                    <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{order.customerContact.phone}</p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
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
    );
}

// Componente Isolado para o Histórico de Pedidos
function OrderHistoryDialog({ allOrders, open, onOpenChange }: { allOrders: Order[], open: boolean, onOpenChange: (open: boolean) => void }) {
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
                                        <CardDescription className="text-base font-semibold text-foreground/90 flex items-center gap-2 mt-1">
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
    );
}

// Componente de Conteúdo do Painel
function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'orders';

    const [allProducts, setAllProducts] = useState(() => getProducts());
    const [allOrders, setAllOrders] = useState(() => getOrders());
    const [isHistoryDialogOpen, setHistoryDialogOpen] = useState(false);

    const pendingOrders = allOrders.filter(o => o.status === 'Pendente');

    const handleProductUpdate = () => {
        setAllProducts(getProducts());
    };

    const handleTabChange = (newTab: string) => {
        router.push(`/dashboard?tab=${newTab}`, { scroll: false });
    };
    
    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <BackButton />
            </div>
            <h1 className="text-3xl font-bold font-headline text-primary mb-6 text-center">Painel do Agricultor</h1>

            <Dialog open={isHistoryDialogOpen} onOpenChange={setHistoryDialogOpen}>
                <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders" className="text-base font-semibold">Pedidos</TabsTrigger>
                        <TabsTrigger value="products" className="text-base font-semibold">Meus Produtos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders" className="mt-6">
                        <div className="mb-6 flex justify-end">
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <History className="h-4 w-4 mr-2" />
                                    Histórico de Pedidos
                                </Button>
                            </DialogTrigger>
                        </div>
                        <OrdersTabContent orders={pendingOrders} />
                    </TabsContent>
                    <TabsContent value="products" className="mt-6">
                        <ProductsTabContent allProducts={allProducts} onProductUpdate={handleProductUpdate} />
                    </TabsContent>
                </Tabs>
                
                <OrderHistoryDialog 
                    allOrders={allOrders} 
                    open={isHistoryDialogOpen}
                    onOpenChange={setHistoryDialogOpen}
                />
            </Dialog>
        </div>
    );
}

// Componente Principal da Página
export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
