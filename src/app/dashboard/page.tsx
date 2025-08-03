import { getOrders, getProducts } from "@/lib/data";
import type { Order, Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Edit, PlusCircle, Trash2, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

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
    // Simulating logged in farmer with ID '1'
    const farmerId = '1';
    const products = getProducts().filter(p => p.farmerId === farmerId);

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Meus Produtos</CardTitle>
                        <CardDescription className="font-semibold">Adicione, edite ou remova produtos do seu inventário.</CardDescription>
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
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-primary">{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="font-bold text-lg">R${product.price.toFixed(2).replace('.', ',')} <span className="text-base font-medium text-foreground/80">/ {product.unit}</span></p>
                                <p className="text-base font-semibold text-foreground/90 mt-2 line-clamp-3">{product.description}</p>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button variant="outline" className="w-full">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Excluir
                                </Button>
                                <EditProductForm product={product} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function OrdersTabContent() {
    const orders = getOrders();

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
                <CardTitle>Pedidos Recebidos</CardTitle>
                <CardDescription className="font-semibold">Revise e gerencie novos pedidos de seus clientes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="border-collapse border-2 border-border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-primary text-primary-foreground border-b-2 border-r-2 border-primary-foreground">ID do Pedido</TableHead>
                            <TableHead className="bg-primary text-primary-foreground border-b-2 border-r-2 border-primary-foreground">Cliente</TableHead>
                            <TableHead className="bg-primary text-primary-foreground border-b-2 border-r-2 border-primary-foreground">Itens</TableHead>
                            <TableHead className="text-right bg-primary text-primary-foreground border-b-2 border-r-2 border-primary-foreground">Total</TableHead>
                            <TableHead className="bg-primary text-primary-foreground border-b-2 border-r-2 border-primary-foreground">Status</TableHead>
                            <TableHead className="bg-primary text-primary-foreground border-b-2 border-primary-foreground">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="text-base font-semibold border-b-2 border-b-primary-foreground">
                                <TableCell className="font-semibold border-r-2 border-border">{order.id}</TableCell>
                                <TableCell className="border-r-2 border-border">{order.customerName}</TableCell>
                                <TableCell className="border-r-2 border-border">
                                    {order.items.map(item => `${item.productName} (x${item.quantity})`).join(', ')}
                                </TableCell>
                                <TableCell className="text-right border-r-2 border-border">R${order.total.toFixed(2).replace('.', ',')}</TableCell>

                                <TableCell className="border-r-2 border-border">
                                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {order.status === 'Pendente' && (
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Aceitar
                                            </Button>
                                            <Button size="sm" variant="destructive">
                                                <XCircle className="h-4 w-4 mr-2" />
                                                Recusar
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}


export default function DashboardPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold font-headline text-primary mb-6">Painel do Agricultor</h1>

            <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
                    <TabsTrigger value="orders" className="text-lg font-bold">Pedidos</TabsTrigger>
                    <TabsTrigger value="products" className="text-lg font-bold">Meus Produtos</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <OrdersTabContent />
                </TabsContent>
                <TabsContent value="products">
                    <ProductsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    );
}
