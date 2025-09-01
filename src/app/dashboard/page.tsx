

'use client';

import { Suspense, useState, useMemo, useTransition, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getOrders, getProducts, toggleProductPromotion, updateProduct, deleteProduct, toggleProductStatus, getFarmerById, updateProductStock, addProduct } from "@/lib/data";
import type { Order, Product, CustomerAddress } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Edit, PlusCircle, Trash2, ShoppingBag, User, DollarSign, Download, Share2, History, Search, Tag, Calendar as CalendarIcon, Truck, Phone, Home, MapPin, AlertTriangle, Power, X, FileText, FileImage, FileJson, PackageCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function getFairDisplayName(fair: string): string {
    const doExceptions = ['Grajaú', 'Flamengo', 'Leme'];
    if (doExceptions.includes(fair)) {
        return `Feira do ${fair}`;
    }
    const deExceptions = ['Laranjeiras', 'Botafogo'];
    if (deExceptions.includes(fair)) {
        return `Feira de ${deExceptions}`;
    }
    return `Feira da ${fair}`;
}

// Helper to format address object into a string
const formatAddress = (address?: CustomerAddress | string): string => {
    if (!address) return 'Endereço não informado';
    if (typeof address === 'string') return address;
    const { street, number, complement, neighborhood, city, state, zipCode } = address;
    let fullAddress = `${street}, ${number}`;
    if (complement) fullAddress += `, ${complement}`;
    if (neighborhood) fullAddress += ` - ${neighborhood}`;
    if (city) fullAddress += `, ${city}`;
    if (state) fullAddress += ` - ${state}`;
    if (zipCode) fullAddress += ` - CEP: ${zipCode}`;
    return fullAddress;
};


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
        // Permite zerar o campo, mas não salvar negativo
        const numValue = parseFloat(value);
        if (value === '' || numValue >= 0) {
            setProduct(prev => ({ ...prev, [id]: value === '' ? undefined : numValue }));
        }
    };

    const handleSubmit = () => {
        setIsSaving(true);
        // Salva todos os campos, incluindo o novo unitAmount
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
                        <Input id="name" value={product.name} onChange={handleInputChange} className="bg-card" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Preço (R$)</Label>
                            <Input id="price" type="number" min="0" value={product.price} onChange={handleNumberInputChange} className="bg-card" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unidade</Label>
                            <Select value={product.unit} onValueChange={(value) => setProduct(p => ({...p, unit: value}))}>
                                <SelectTrigger className="bg-card">
                                    <SelectValue placeholder="Unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kg">por kg</SelectItem>
                                    <SelectItem value="g">por g</SelectItem>
                                    <SelectItem value="unidade">unidade</SelectItem>
                                    <SelectItem value="maço">maço</SelectItem>
                                    <SelectItem value="dúzia">dúzia</SelectItem>
                                    <SelectItem value="litro">litro</SelectItem>
                                    <SelectItem value="ml">ml</SelectItem>
                                    <SelectItem value="molho">molho</SelectItem>
                                    <SelectItem value="caixa">caixa</SelectItem>
                                    <SelectItem value="pote">pote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" value={product.description} onChange={handleInputChange} placeholder="Descreva seu produto..." className="bg-card" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="image">Foto</Label>
                        <Input id="image" type="file" disabled className="bg-card" />
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


function AddProductForm({ onProductAdded, farmerId }: { onProductAdded: () => void, farmerId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [unit, setUnit] = useState('unidade');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState<number | undefined>(0);
    const [category, setCategory] = useState<'Vegetal' | 'Fruta' | 'Laticínio' | 'Padaria'>('Vegetal');


    const resetForm = () => {
        setName('');
        setPrice(undefined);
        setUnit('unidade');
        setDescription('');
        setStock(0);
        setCategory('Vegetal');
    }

    const handleSubmit = () => {
        if (!name || price === undefined || !unit) {
            toast({
                variant: 'destructive',
                title: "Campos obrigatórios",
                description: "Por favor, preencha Nome, Preço e Unidade.",
            });
            return;
        }
         if (price < 0) {
            toast({
                variant: "destructive",
                title: "Preço Inválido",
                description: "O preço do produto não pode ser negativo.",
            });
            return;
        }

        setIsSaving(true);
        const newProductData: Omit<Product, 'id' | 'image' | 'dataAiHint' | 'status'> = {
            name,
            price,
            unit,
            description,
            stock,
            category,
            farmerId
        };

        addProduct(newProductData);
        
        setTimeout(() => {
            onProductAdded();
            setIsSaving(false);
            setIsOpen(false);
            resetForm();
            toast({
                title: "Produto adicionado!",
                description: `${name} foi adicionado com sucesso ao seu inventário.`,
            });
        }, 500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
        }}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    Adicionar Produto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Produto</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes do novo produto. Clique em salvar para adicioná-lo ao seu catálogo.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-base">
                    <div className="space-y-2">
                        <Label htmlFor="new-name">Nome do Produto</Label>
                        <Input id="new-name" value={name} onChange={(e) => setName(e.target.value)} className="bg-card" />
                    </div>
                    
                     <div className="space-y-2">
                        <Label htmlFor="new-category">Categoria</Label>
                        <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                            <SelectTrigger className="bg-card">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Vegetal">Vegetal</SelectItem>
                                <SelectItem value="Fruta">Fruta</SelectItem>
                                <SelectItem value="Laticínio">Laticínio</SelectItem>
                                <SelectItem value="Padaria">Padaria</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-price">Preço (R$)</Label>
                            <Input id="new-price" type="number" min="0" value={price ?? ''} onChange={(e) => setPrice(parseFloat(e.target.value) || undefined)} className="bg-card" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-unit">Unidade</Label>
                            <Select value={unit} onValueChange={(value) => setUnit(value)}>
                                <SelectTrigger className="bg-card">
                                    <SelectValue placeholder="Unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kg">por kg</SelectItem>
                                    <SelectItem value="g">por g</SelectItem>
                                    <SelectItem value="unidade">unidade</SelectItem>
                                    <SelectItem value="maço">maço</SelectItem>
                                    <SelectItem value="dúzia">dúzia</SelectItem>
                                    <SelectItem value="litro">litro</SelectItem>
                                    <SelectItem value="ml">ml</SelectItem>
                                    <SelectItem value="molho">molho</SelectItem>
                                    <SelectItem value="caixa">caixa</SelectItem>
                                    <SelectItem value="pote">pote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="new-stock">Estoque Inicial</Label>
                        <Input id="new-stock" type="number" min="0" value={stock ?? ''} onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)} className="bg-card" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-description">Descrição</Label>
                        <Textarea id="new-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva seu produto..." className="bg-card" />
                    </div>
                </div>
                <DialogFooter>
                      <Button type="button" onClick={handleSubmit} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar Produto
                      </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


// Componente para Edição Rápida de Estoque
function EditStockDialog({ product, onStockUpdate }: { product: Product, onStockUpdate: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [stock, setStock] = useState<number>(product.stock ?? 0);
    const { toast } = useToast();

    const handleSubmit = () => {
        setIsSaving(true);
        updateProductStock(product.id, stock);
        setTimeout(() => {
            onStockUpdate();
            setIsSaving(false);
            setIsOpen(false);
            toast({
                title: "Estoque Atualizado!",
                description: `O estoque de ${product.name} foi atualizado para ${stock}.`,
            });
        }, 300);
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-auto px-2 py-1 text-xs bg-accent text-accent-foreground hover:bg-accent/80">Editar Estoque</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle>Atualizar Estoque</DialogTitle>
                    <DialogDescription>
                        {product.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="stock">Quantidade Disponível</Label>
                    <Input 
                        id="stock" 
                        type="number" 
                        min="0"
                        value={stock} 
                        onChange={(e) => setStock(Math.max(0, Number(e.target.value)))}
                        className="bg-card"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSubmit} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Componente Isolado para a Aba de Produtos
function ProductsTabContent({ products, farmerId, onProductUpdate }: { products: Product[], farmerId: string, onProductUpdate: () => void }) {
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

    const handleStatusToggle = (productId: string, checked: boolean) => {
        const newStatus = checked ? 'active' : 'paused';
        startTransition(() => {
            toggleProductStatus(productId, newStatus);
            onProductUpdate();
             toast({
                title: newStatus === 'active' ? "Produto Ativado" : "Produto Pausado",
                description: newStatus === 'active' ? "Seu produto agora está visível no catálogo." : "Seu produto foi ocultado do catálogo.",
            });
        });
    }

    const handleDeleteProduct = (productId: string) => {
        startTransition(() => {
            deleteProduct(productId);
            onProductUpdate();
            toast({
                variant: "destructive",
                title: "Produto Excluído",
                description: "O produto foi removido do seu inventário.",
            });
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Meus Produtos</CardTitle>
                        <CardDescription>Adicione, edite, promova ou gerencie o estoque dos seus produtos.</CardDescription>
                    </div>
                     <AddProductForm onProductAdded={onProductUpdate} farmerId={farmerId} />
                </div>
            </CardHeader>
            <CardContent>
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg font-semibold text-muted-foreground">Nenhum produto encontrado com o termo pesquisado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => {
                            const isLojaOrganica = product.farmerId === '134';
                            const isOutOfStock = product.stock !== undefined && product.stock <= 0;

                            return (
                                <Card key={product.id} className={cn("flex flex-col border-primary border-2 transition-opacity", (product.status === 'paused' || isOutOfStock) && 'opacity-60')}>
                                    <div className={cn(
                                        "relative bg-muted/30",
                                        isLojaOrganica ? "aspect-[3/4]" : "aspect-[3/2]"
                                    )}>
                                        <Image 
                                            src={product.image} 
                                            alt={product.name} 
                                            fill 
                                            className="rounded-t-lg object-cover" 
                                            data-ai-hint={product.dataAiHint} 
                                        />
                                        {product.promotion?.isActive && (
                                            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground hover:bg-accent">
                                                <Tag className="h-3 w-3 mr-1"/>
                                                Promoção
                                            </Badge>
                                        )}
                                        {product.status === 'paused' && (
                                            <Badge variant="destructive" className="absolute top-2 left-2">
                                                <Power className="h-3 w-3 mr-1"/>
                                                Pausado
                                            </Badge>
                                        )}
                                        {isOutOfStock && (
                                            <Badge variant="destructive" className="absolute bottom-2 right-2">
                                                Esgotado
                                            </Badge>
                                        )}
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl text-primary">{product.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow space-y-3">
                                        <div>
                                            <p className="font-bold text-lg">R${product.price.toFixed(2).replace('.', ',')} <span className="text-base font-medium text-foreground/80">/ {product.unit}</span></p>
                                            <p className="text-lg font-semibold text-foreground/90 mt-2 line-clamp-3">{product.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between text-base font-semibold bg-muted p-2 rounded-md">
                                            <span className="flex items-center gap-2 text-primary">
                                                <PackageCheck className="h-4 w-4" />
                                                Estoque:
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className={cn("font-bold", isOutOfStock && "text-destructive")}>{product.stock ?? 'N/D'}</span>
                                                <EditStockDialog product={product} onStockUpdate={onProductUpdate} />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-4">
                                        <div className="flex items-center space-x-2 w-full justify-start p-2 bg-muted rounded-md">
                                            <Switch
                                                id={`status-${product.id}`}
                                                checked={product.status === 'active'}
                                                onCheckedChange={(checked) => handleStatusToggle(product.id, checked)}
                                                disabled={isPending}
                                            />
                                            <Label htmlFor={`status-${product.id}`} className="text-sm font-semibold cursor-pointer">
                                            Ativo no catálogo
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 w-full justify-start p-2 bg-muted rounded-md">
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
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Excluir
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="flex items-center gap-2 text-xl">
                                                        <AlertTriangle className="text-destructive"/>
                                                            Tem certeza que deseja excluir este produto?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-base">
                                                            Esta ação não pode ser desfeita. Isso irá remover permanentemente o produto <span className="font-bold">"{product.name}"</span> do seu inventário.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction 
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                                        >
                                                            Sim, Excluir
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            
                                            <EditProductForm product={product} onSaveChanges={onProductUpdate} />
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Componente para renderizar o recibo do pedido (usado para gerar imagem)
function OrderReceipt({ order, farmerName, ref }: { order: Order, farmerName: string, ref: React.Ref<HTMLDivElement>}) {
    return (
        <div ref={ref} className="bg-white p-6 rounded-lg text-black w-[400px]">
             <h2 className="text-2xl font-bold mb-4 text-center">Resumo do Pedido</h2>
             <p><strong>ID do Pedido:</strong> {order.id}</p>
             <p><strong>Cliente:</strong> {order.customerName}</p>
             <p><strong>Data:</strong> {format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</p>
             <Separator className="my-4" />
             <h3 className="text-lg font-bold">Itens:</h3>
             <ul className="list-disc pl-5">
                 {order.items.map((item, index) => (
                     <li key={index}>{item.quantity}x {item.productName}</li>
                 ))}
             </ul>
             <Separator className="my-4" />
             <p><strong>Vendido por:</strong> {farmerName}</p>
             <p><strong>Entrega:</strong> {order.deliveryOption === 'pickup' && order.pickupLocation ? `Retirar em ${order.pickupLocation}` : 'Delivery'}</p>
             {order.deliveryOption === 'delivery' && (
                <>
                  <p><strong>Endereço:</strong> {formatAddress(order.customerContact?.address)}</p>
                  <p><strong>Telefone:</strong> {order.customerContact?.phone}</p>
                </>
             )}
             <Separator className="my-4" />
             <p className="text-xl font-bold text-right">Total: R$ {order.total.toFixed(2).replace('.', ',')}</p>
        </div>
    );
}


// Componente Isolado para a Aba de Pedidos
function OrdersTabContent({ orders }: { orders: Order[] }) {
    const { user: farmerUser } = useUser();
    const { toast } = useToast();
    const receiptRef = useRef<HTMLDivElement>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const getOrderSummary = (order: Order) => {
        const itemsText = order.items.map(item => `- ${item.quantity}x ${item.productName}`).join('\n');
        
        const deliveryText = order.deliveryOption === 'pickup' && order.pickupLocation
            ? `Retirar na ${order.pickupLocation}`
            : `Delivery para: ${formatAddress(order.customerContact?.address) || 'Endereço não informado'}`;
        
        return `
Resumo do Pedido - Minha Feira
------------------------------------
ID do Pedido: ${order.id}
Data: ${format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
Cliente: ${order.customerName}
Contato: ${order.customerContact?.phone || 'Não informado'}
Status: ${order.status}
------------------------------------
Itens:
${itemsText}
------------------------------------
Total: R$ ${order.total.toFixed(2).replace('.', ',')}
Entrega: ${deliveryText}
------------------------------------
        `.trim();
    };

    const shareFile = async (file: File, title: string) => {
         if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: title,
                    text: `Segue o resumo do pedido ${selectedOrder?.id}.`,
                });
            } catch (error) {
                 toast({
                    variant: "destructive",
                    title: "Compartilhamento cancelado",
                    description: "A ação de compartilhar foi cancelada ou falhou.",
                });
            }
        } else {
            toast({
                variant: "destructive",
                title: "Compartilhamento não suportado",
                description: "Seu navegador não suporta o compartilhamento de arquivos.",
            });
        }
        setSelectedOrder(null);
    }
    
    const handleShareAsTxt = async () => {
        if (!selectedOrder) return;
        const text = getOrderSummary(selectedOrder);
        const file = new File([text], `pedido_${selectedOrder.id}.txt`, { type: 'text/plain' });
        await shareFile(file, `Pedido ${selectedOrder.id}`);
    };

    const handleShareAsPdf = async () => {
        if (!selectedOrder) return;
        const doc = new jsPDF();
        doc.setFont("helvetica");
        doc.setFontSize(12);
        doc.text(getOrderSummary(selectedOrder), 10, 10);
        const pdfBlob = doc.output('blob');
        const file = new File([pdfBlob], `pedido_${selectedOrder.id}.pdf`, { type: 'application/pdf' });
        await shareFile(file, `Pedido ${selectedOrder.id}`);
    };

    const handleShareAsJpg = async () => {
        if (!receiptRef.current || !selectedOrder) return;
        try {
            const dataUrl = await htmlToImage.toJpeg(receiptRef.current, { quality: 0.95 });
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], `pedido_${selectedOrder.id}.jpg`, { type: 'image/jpeg' });
            await shareFile(file, `Pedido ${selectedOrder.id}`);
        } catch (error) {
            console.error('oops, something went wrong!', error);
             toast({
                variant: "destructive",
                title: "Erro ao gerar imagem",
                description: "Não foi possível criar a imagem do pedido.",
            });
        }
    };


    const handleSaveOrderAsTxt = (order: Order) => {
        const orderSummary = getOrderSummary(order);
        const blob = new Blob([orderSummary], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pedido_${order.id}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSaveOrderAsPdf = (order: Order) => {
        const doc = new jsPDF();
        const orderSummary = getOrderSummary(order);
        
        doc.setFont("helvetica");
        doc.setFontSize(12);
        doc.text(orderSummary, 10, 10);
        doc.save(`pedido_${order.id}.pdf`);
    };

    return (
        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Pedidos Pendentes</CardTitle>
                        <CardDescription>Revise e gerencie os pedidos de seus clientes.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length > 0 ? orders.map((order) => {
                    const date = new Date(order.date);
                    const formattedDate = format(date, "EEEE | dd/MM/yyyy", { locale: ptBR });
                    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
                    return (
                        <Card key={order.id} className="flex flex-col border-accent border-2">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="font-headline text-2xl text-primary">{order.id.split('-')[1]}</CardTitle>
                                        <CardDescription className="text-base font-semibold text-foreground/90 flex items-center gap-2 mt-1">
                                            <User className="h-4 w-4"/>
                                            {order.customerName}
                                        </CardDescription>
                                        <CardDescription className="text-sm font-bold text-accent flex items-center gap-2 mt-2">
                                            <CalendarIcon className="h-4 w-4" />
                                            {capitalizedDate}
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
                                                        <p className="flex items-start gap-2"><Home className="h-4 w-4 mt-1 flex-shrink-0" />{formatAddress(order.customerContact.address)}</p>
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
                            <CardFooter>
                                <div className="flex w-full gap-2">
                                    <Button variant="outline" className="w-full" onClick={() => setSelectedOrder(order)}>
                                        <Share2 className="h-4 w-4 mr-1 sm:mr-2" />
                                        WhatsApp
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                <Download className="h-4 w-4 mr-1 sm:mr-2" />
                                                Salvar
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Salvar Pedido</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Escolha o formato no qual você deseja salvar os detalhes deste pedido.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="sm:justify-center gap-2 pt-4">
                                                <AlertDialogAction asChild>
                                                    <Button className="w-full" onClick={() => handleSaveOrderAsTxt(order)}>
                                                        Salvar como .txt
                                                    </Button>
                                                </AlertDialogAction>
                                                <AlertDialogAction asChild>
                                                    <Button className="w-full" onClick={() => handleSaveOrderAsPdf(order)}>
                                                        Salvar como .pdf
                                                    </Button>
                                                </AlertDialogAction>
                                                <AlertDialogCancel className="w-full mt-2 sm:mt-0">Cancelar</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                }) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-lg font-semibold text-muted-foreground">Nenhum pedido pendente encontrado.</p>
                    </div>
                )}
            </CardContent>

             <AlertDialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Compartilhar Pedido</AlertDialogTitle>
                        <AlertDialogDescription>
                           Escolha o formato para compartilhar o resumo do pedido.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                         <Button onClick={handleShareAsJpg}><FileImage className="h-4 w-4 mr-2" /> Imagem (.jpg)</Button>
                         <Button onClick={handleShareAsPdf}><FileJson className="h-4 w-4 mr-2" /> PDF (.pdf)</Button>
                         <Button onClick={handleShareAsTxt}><FileText className="h-4 w-4 mr-2" /> Texto (.txt)</Button>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
             {/* Elemento oculto para renderizar o recibo para a imagem */}
             <div className="fixed -left-[9999px] top-0">
                {selectedOrder && farmerUser && <OrderReceipt order={selectedOrder} farmerName={farmerUser.name} ref={receiptRef} />}
            </div>
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
                <DialogTitle className="text-2xl font-headline text-primary">Histórico de Pedidos</DialogTitle>
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
                                        <CardDescription className="text-sm font-semibold text-foreground/80 flex items-center gap-2 mt-2">
                                            <CalendarIcon className="h-4 w-4" />
                                            {format(new Date(order.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
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
                <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado com os filtros aplicados.</p>
               )}
            </div>
            <DialogFooter>
                 <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
            </DialogFooter>
        </DialogContent>
    );
}

// Componente de Conteúdo do Painel
function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'orders';
    const { user } = useUser();

    const [allProducts, setAllProducts] = useState(() => getProducts({ includePaused: true }));
    const [allOrders, setAllOrders] = useState(() => getOrders());
    const [isHistoryDialogOpen, setHistoryDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const { pendingOrders, historyOrders, farmerProducts } = useMemo(() => {
        const farmerId = user?.id;
        if (!farmerId) return { pendingOrders: [], historyOrders: [], farmerProducts: [] };

        const currentFarmerProducts = getProducts({ includePaused: true }).filter(p => p.farmerId === farmerId);
        const farmerProductNames = new Set(currentFarmerProducts.map(p => p.name));
        
        const relevantOrders = allOrders.filter(order =>
            order.items.some(item => farmerProductNames.has(item.productName))
        );
        
        return {
            pendingOrders: relevantOrders.filter(o => o.status === 'Pendente'),
            historyOrders: relevantOrders.filter(o => o.status !== 'Pendente'),
            farmerProducts: currentFarmerProducts
        };
    }, [allOrders, allProducts, user]);

    const filteredOrders = useMemo(() => {
        if (!debouncedSearchTerm) return pendingOrders;
        return pendingOrders.filter(order => 
            order.customerName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [pendingOrders, debouncedSearchTerm]);

    const filteredProducts = useMemo(() => {
        if (!debouncedSearchTerm) return farmerProducts;
        return farmerProducts.filter(product =>
            product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [farmerProducts, debouncedSearchTerm]);


    const handleProductUpdate = () => {
        setAllProducts(getProducts({ includePaused: true }));
    };

    const handleTabChange = (newTab: string) => {
        router.push(`/dashboard?tab=${newTab}`, { scroll: false });
    };

    const searchPlaceholder = tab === 'orders' ? "Buscar por cliente ou ID..." : "Buscar por produto...";
    
    if (!user) {
         return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold font-headline text-primary mb-6">Painel do Agricultor</h1>

            <Dialog open={isHistoryDialogOpen} onOpenChange={setHistoryDialogOpen}>
                <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders" className="text-base font-semibold">Pedidos</TabsTrigger>
                        <TabsTrigger value="products" className="text-base font-semibold">Meus Produtos</TabsTrigger>
                    </TabsList>

                    <div className="relative my-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={searchPlaceholder}
                            className="pl-10 w-full bg-card"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <TabsContent value="orders" className="mt-6">
                        <div className="mb-6 flex justify-end">
                            <Button variant="outline" onClick={() => setHistoryDialogOpen(true)}>
                                <History className="h-4 w-4 mr-2" />
                                Histórico de Pedidos
                            </Button>
                        </div>
                        <OrdersTabContent orders={filteredOrders} />
                    </TabsContent>
                    <TabsContent value="products" className="mt-6">
                        <ProductsTabContent products={filteredProducts} farmerId={user.id} onProductUpdate={handleProductUpdate} />
                    </TabsContent>
                </Tabs>
                
                <OrderHistoryDialog 
                    allOrders={historyOrders} 
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
