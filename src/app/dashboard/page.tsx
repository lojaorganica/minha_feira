import { getOrders, getProducts } from "@/lib/data";
import type { Order, Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
                <Button size="sm" variant="outline">
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
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Meus Produtos</CardTitle>
                        <CardDescription>Adicione, edite ou remova produtos do seu inventário.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Adicionar Produto
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Imagem</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} className="text-base font-medium">
                                <TableCell>
                                    <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={product.dataAiHint} />
                                </TableCell>
                                <TableCell className="font-semibold">{product.name}</TableCell>
                                <TableCell>R${product.price.toFixed(2).replace('.', ',')}</TableCell>
                                <TableCell>{product.unit}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <EditProductForm product={product} />
                                        <Button size="sm" variant="destructive">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Excluir
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                <CardDescription>Revise e gerencie novos pedidos de seus clientes.</CardDescription>
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
                            <TableRow key={order.id} className="text-base font-semibold">
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
                    <TabsTrigger value="orders">Pedidos</TabsTrigger>
                    <TabsTrigger value="products">Meus Produtos</TabsTrigger>
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
