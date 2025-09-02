
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { getProducts, updateProductStock } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BackButton from '@/components/back-button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Search, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';


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


export default function InventoryPage() {
    const { user, isUserLoaded } = useUser();
    const { toast } = useToast();
    
    const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
    const [initialStocks, setInitialStocks] = useState<Map<string, number | undefined>>(new Map());
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            const products = getProducts({ includePaused: true }).filter(p => p.farmerId === user.id);
            setFarmerProducts(products);
            const stocks = new Map(products.map(p => [p.id, p.stock]));
            setInitialStocks(stocks);
        }
    }, [user]);

    const filteredProducts = useMemo(() => {
        if (!debouncedSearchTerm) return farmerProducts;
        return farmerProducts.filter(p => p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }, [farmerProducts, debouncedSearchTerm]);


    const handleStockChange = (productId: string, newStock: string) => {
        const stockValue = parseInt(newStock, 10);
        
        if (newStock === '') {
            setFarmerProducts(prev => 
                prev.map(p => p.id === productId ? { ...p, stock: undefined } : p)
            );
            return;
        }

        if (isNaN(stockValue) || stockValue < 0) {
            return;
        }

        setFarmerProducts(prev => 
            prev.map(p => p.id === productId ? { ...p, stock: stockValue } : p)
        );
    };
    
    const hasChanges = useMemo(() => {
       if(farmerProducts.length === 0) return false;
       for (const product of farmerProducts) {
            if (product.stock !== initialStocks.get(product.id)) {
                return true;
            }
       }
       return false;
    }, [farmerProducts, initialStocks]);


    const handleSaveAll = () => {
        setIsSaving(true);
        try {
            farmerProducts.forEach(product => {
                if (product.stock !== initialStocks.get(product.id)) {
                    updateProductStock(product.id, product.stock ?? 0);
                }
            });
            const newInitialStocks = new Map(farmerProducts.map(p => [p.id, p.stock]));
            setInitialStocks(newInitialStocks);

            toast({
                title: "Estoque Salvo!",
                description: "Todas as alterações no estoque foram salvas com sucesso.",
            });
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Erro ao Salvar",
                description: "Não foi possível salvar as alterações no estoque.",
            });
        } finally {
            setIsSaving(false);
        }
    }


    if (!isUserLoaded) {
        return <div className="flex justify-center items-center p-12"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4">
                <BackButton />
            </div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl flex items-center gap-3">
                    <Activity />
                    Controle de Estoque
                </h1>
                <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">
                    Gerencie a quantidade disponível de cada um dos seus produtos em um só lugar.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <CardTitle>Listagem de Produtos</CardTitle>
                            <CardDescription>
                                Atualize a quantidade em estoque dos seus produtos. Clique em salvar para aplicar todas as alterações.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                             <div className="text-right flex-grow sm:flex-grow-0">
                                <p className="text-xl font-bold text-accent">Total: {farmerProducts.length}</p>
                            </div>
                            <Button onClick={handleSaveAll} disabled={!hasChanges || isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Salvar Alterações
                            </Button>
                        </div>
                    </div>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar por produto..."
                            className="pl-10 w-full sm:w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <span className="whitespace-nowrap">Produto ({farmerProducts.length})</span>
                                    </TableHead>
                                    <TableHead className="w-40 text-center">Estoque Atual</TableHead>
                                    <TableHead className="w-32 text-center">Unidade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.length > 0 ? filteredProducts.map(product => (
                                     <TableRow key={product.id} className={cn(product.status === 'paused' && 'opacity-50')}>
                                        <TableCell>
                                            <div className="font-medium">{product.name}</div>
                                             {product.status === 'paused' && (
                                                <span className="text-xs text-destructive font-semibold">Pausado</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Input 
                                                type="number"
                                                min="0" 
                                                value={product.stock ?? ''}
                                                onChange={(e) => handleStockChange(product.id, e.target.value)}
                                                className="text-center font-bold"
                                                placeholder="N/D"
                                            />
                                        </TableCell>
                                        <TableCell className="text-center text-muted-foreground">{product.unit}</TableCell>
                                     </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24">
                                            Nenhum produto encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
