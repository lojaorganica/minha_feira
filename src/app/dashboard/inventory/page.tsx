
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useUser } from '@/hooks/use-user';
import { getProducts, updateProductStock } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BackButton from '@/components/back-button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Search, Activity, Share2, Printer, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            const products = getProducts({ includePaused: true }).filter(p => p.farmerId === user.id);
            setFarmerProducts(products);
            const stocks = new Map(products.map(p => [p.id, p.stock]));
            setInitialStocks(stocks);

            const savedDate = localStorage.getItem(`inventory_last_updated_${user.id}`);
            if(savedDate) {
                setLastUpdated(new Date(savedDate));
            }
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

            const now = new Date();
            setLastUpdated(now);
            if(user) {
                localStorage.setItem(`inventory_last_updated_${user.id}`, now.toISOString());
            }

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

    const generatePdf = () => {
        if (!user || filteredProducts.length === 0) return;
        const doc = new jsPDF('p', 'pt', 'a4');
        const formattedDate = lastUpdated ? format(lastUpdated, "EEEE, dd/MM/yyyy", { locale: ptBR }) : 'Não salvo';
        const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`Relatório de Estoque - ${user.name}`, doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Data da Última Atualização: ${capitalizedDate}`, 40, 60);
    
        (doc as any).autoTable({
          startY: 80,
          head: [['Produto', 'Estoque', 'Unidade', 'Status']],
          body: filteredProducts.map(p => [
            p.name,
            p.stock ?? 'N/D',
            p.unit,
            p.status === 'active' ? 'Ativo' : 'Pausado'
          ]),
           headStyles: { fillColor: [39, 78, 54] },
           columnStyles: {
            1: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
           }
        });
    
        doc.save(`estoque_${user.name}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (!user) return;
        const formattedDate = lastUpdated ? format(lastUpdated, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) : 'Não salvo';
        let shareText = `*Relatório de Estoque - ${user.name}*\n`;
        shareText += `_Atualizado em: ${formattedDate}_\n\n`;
    
        filteredProducts.forEach(p => {
          shareText += `*${p.name}:* ${p.stock ?? 'N/D'} ${p.unit} (${p.status === 'active' ? 'Ativo' : 'Pausado'})\n`;
        });
    
        if (navigator.share) {
          try {
            await navigator.share({
              title: `Estoque de ${user.name}`,
              text: shareText,
            });
          } catch (error) {
            console.error('Erro ao compartilhar:', error);
          }
        } else {
            navigator.clipboard.writeText(shareText);
            toast({
                title: "Copiado!",
                description: "O relatório de estoque foi copiado para a área de transferência."
            });
        }
      };


    if (!isUserLoaded) {
        return <div className="flex justify-center items-center p-12"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    const formattedLastUpdated = lastUpdated
    ? format(lastUpdated, "EEEE | dd/MM/yyyy", { locale: ptBR })
    : "Ainda não salvo";
    const capitalizedDate = formattedLastUpdated.charAt(0).toUpperCase() + formattedLastUpdated.slice(1);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <style>{`
                @media print {
                  body, html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                  body * { visibility: hidden; }
                  .print-container, .print-container * { visibility: visible; }
                  .print-container { position: absolute; left: 0; top: 0; width: 100%; margin: 20px; }
                  .no-print { display: none !important; }
                   table { width: 100%; border-collapse: collapse; }
                   th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                   thead { background-color: #f2f2f2 !important; }
                }
            `}</style>

            <div className="mb-4 no-print">
                <BackButton />
            </div>
            <div className="mb-6 no-print">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl flex items-center gap-3">
                    <Activity />
                    Controle de Estoque
                </h1>
                <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">
                    Gerencie a quantidade disponível de cada um dos seus produtos em um só lugar.
                </p>
            </div>

            <div ref={printRef} className="print-container">
                <Card>
                    <CardHeader className="no-print">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle>Listagem de Produtos</CardTitle>
                                <CardDescription>
                                    Atualize a quantidade em estoque dos seus produtos. Clique em salvar para aplicar todas as alterações.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-xl font-bold text-accent">Total: {farmerProducts.length}</p>
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
                         <div className="mt-4">
                            <p className="text-sm font-semibold text-muted-foreground">Última atualização: <span className="font-bold text-accent">{capitalizedDate}</span></p>
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
                                                    className="text-center font-bold no-print"
                                                    placeholder="N/D"
                                                />
                                                <span className="hidden print:inline">{product.stock ?? 'N/D'}</span>
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
                     <CardFooter className="flex-col md:flex-row gap-2 justify-end no-print p-6">
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <Button variant="outline" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Compartilhar</Button>
                            <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
                            <Button onClick={generatePdf}><Download className="mr-2 h-4 w-4" /> PDF</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
