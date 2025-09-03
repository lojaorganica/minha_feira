
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useUser } from '@/hooks/use-user';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BackButton from '@/components/back-button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search, Share2, Printer, Download, Tags } from 'lucide-react';
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


export default function PricesPage() {
    const { user, isUserLoaded } = useUser();
    const { toast } = useToast();
    
    const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            const products = getProducts({ includePaused: false }).filter(p => p.farmerId === user.id);
            setFarmerProducts(products);
        }
    }, [user]);

    const filteredProducts = useMemo(() => {
        if (!debouncedSearchTerm) return farmerProducts;
        return farmerProducts.filter(p => p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }, [farmerProducts, debouncedSearchTerm]);


    const generatePdf = () => {
        if (!user || filteredProducts.length === 0) return;
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4'
        });
        const formattedDate = format(new Date(), "dd/MM/yyyy", { locale: ptBR });
    
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text(`Tabela de Preços - ${user.name}`, doc.internal.pageSize.getWidth() / 2, 60, { align: "center" });
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Data: ${formattedDate}`, doc.internal.pageSize.getWidth() / 2, 80, { align: "center" });
    
        (doc as any).autoTable({
          startY: 110,
          head: [['Produto', 'Unidade', 'Preço (R$)']],
          body: filteredProducts.map(p => [
            p.name,
            p.unit,
            p.price.toFixed(2).replace('.', ',')
          ]),
           headStyles: { 
               fillColor: [39, 78, 54],
               fontSize: 16,
               fontStyle: 'bold'
            },
           bodyStyles: {
               fontSize: 14,
               cellPadding: 8,
           },
           columnStyles: {
            0: { cellWidth: 'auto', fontStyle: 'bold' },
            1: { halign: 'center', cellWidth: 80 },
            2: { halign: 'right', cellWidth: 100, fontStyle: 'bold' },
           },
            margin: { left: 40, right: 40 }
        });
    
        doc.save(`tabela_precos_${user.name}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (!user) return;
        let shareText = `*Tabela de Preços - ${user.name}*\n`;
        shareText += `_Preços de ${format(new Date(), 'dd/MM/yyyy')}_\n\n`;
    
        filteredProducts.forEach(p => {
          shareText += `*${p.name}:* R$ ${p.price.toFixed(2).replace('.', ',')} / ${p.unit}\n`;
        });
    
        if (navigator.share) {
          try {
            await navigator.share({
              title: `Tabela de Preços de ${user.name}`,
              text: shareText,
            });
          } catch (error) {
            console.error('Erro ao compartilhar:', error);
          }
        } else {
            navigator.clipboard.writeText(shareText);
            toast({
                title: "Copiado!",
                description: "A tabela de preços foi copiada para a área de transferência."
            });
        }
      };


    if (!isUserLoaded || !user) {
        return <div className="flex justify-center items-center p-12"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }
    
    const formattedDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <style>{`
                @media print {
                  body, html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                  .print-container, .print-container * { visibility: visible; }
                  .print-container { position: absolute; left: 0; top: 0; width: 100%; margin: 20px; }
                  .no-print { display: none !important; }
                  .print-title { font-size: 28pt !important; text-align: center; color: black; }
                  .print-date { font-size: 14pt !important; text-align: center; margin-bottom: 20px; color: black; }
                   table { width: 100%; border-collapse: collapse; }
                   th, td { border: 1px solid #000; padding: 12px; text-align: left; font-size: 16pt !important; }
                   thead { background-color: #eee !important; color: black; font-weight: bold; }
                }
            `}</style>

            <div className="mb-4 no-print">
                <BackButton />
            </div>
            <div className="mb-6 no-print">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl flex items-center gap-3">
                    <Tags />
                    Tabela de Preços
                </h1>
                <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">
                    Consulte, imprima ou compartilhe sua tabela de preços para usar na feira ou enviar para seus clientes.
                </p>
            </div>

            <div ref={printRef} className="print-container">
                <div className="hidden print:block">
                    <h1 className="print-title">Tabela de Preços - {user?.name}</h1>
                    <p className="print-date">Data: {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-3xl text-primary">Tabela de Preços</CardTitle>
                        <CardDescription className="text-lg font-semibold text-foreground/80">{user.name}</CardDescription>
                        <CardDescription className="text-base font-medium text-foreground/70">{formattedDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table className="text-base">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="whitespace-nowrap">Produto <span className="text-accent">({farmerProducts.length})</span></TableHead>
                                    <TableHead className="w-auto text-center whitespace-nowrap">Unidade</TableHead>
                                    <TableHead className="w-auto text-right whitespace-nowrap">Preço (R$)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.length > 0 ? filteredProducts.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-bold">{product.name}</TableCell>
                                        <TableCell className="text-center text-muted-foreground">{product.unit}</TableCell>
                                        <TableCell className="text-right font-bold text-primary">{product.price.toFixed(2).replace('.', ',')}</TableCell>
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
                    </CardContent>
                     <CardFooter className="flex-col items-stretch md:flex-row gap-2 justify-end no-print p-6">
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <Button variant="outline" onClick={handleShare} className="w-full"><Share2 className="mr-2 h-4 w-4" /> Compartilhar</Button>
                            <Button variant="outline" onClick={handlePrint} className="w-full"><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
                            <Button onClick={generatePdf} className="w-full"><Download className="mr-2 h-4 w-4" /> PDF</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
