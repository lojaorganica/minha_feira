
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useUser } from '@/hooks/use-user';
import { getProducts } from '@/lib/data';
import type { Product, Farmer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon, Download, FileText, Loader2, Printer, Save, Share2 } from 'lucide-react';
import BackButton from '@/components/back-button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Separator } from '@/components/ui/separator';

interface RomaneioItem {
  produto: string;
  fornecedor: string;
  quantidade: string;
}

const getFairDisplayName = (fair: string): string => {
    if (!fair) return '';
    const doExceptions = ['Grajaú', 'Flamengo', 'Leme'];
    if (doExceptions.includes(fair)) {
        return `da Feira Orgânica do ${fair}`;
    }
    const deExceptions = ['Laranjeiras'];
    if (deExceptions.includes(fair)) {
        return `da Feira Orgânica de ${deExceptions}`;
    }
    return `da Feira Orgânica da ${fair}`;
};

export default function RomaneioPage() {
  const { user, isUserLoaded } = useUser();
  const farmer = user as Farmer | null;
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFair, setSelectedFair] = useState<string>('');
  const [romaneioData, setRomaneioData] = useState<RomaneioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  const farmerProducts = useMemo(() => {
    if (!farmer) return [];
    return getProducts({ includePaused: true }).filter(p => p.farmerId === farmer.id);
  }, [farmer]);

  useEffect(() => {
    if (farmer && farmer.fairs.length > 0 && !selectedFair) {
      setSelectedFair(farmer.fairs[0]);
    }
  }, [farmer, selectedFair]);
  
  useEffect(() => {
      const initialData = farmerProducts.map(p => ({
        produto: p.name,
        fornecedor: '',
        quantidade: '',
      }));
      setRomaneioData(initialData);
  }, [farmerProducts]);


  useEffect(() => {
    if (selectedFair && date) {
      try {
        const key = `romaneio_${farmer?.id}_${selectedFair}_${format(date, 'yyyy-MM-dd')}`;
        const savedData = localStorage.getItem(key);
        if (savedData) {
          setRomaneioData(JSON.parse(savedData));
        } else {
           const initialData = farmerProducts.map(p => ({
            produto: p.name,
            fornecedor: '',
            quantidade: '',
          }));
          setRomaneioData(initialData);
        }
      } catch (error) {
        console.error("Falha ao carregar dados do localStorage", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedFair, date, farmer, farmerProducts]);

  const handleInputChange = (index: number, field: 'fornecedor' | 'quantidade', value: string) => {
    const updatedData = [...romaneioData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setRomaneioData(updatedData);
  };

  const handleSave = () => {
    if (selectedFair && date) {
      try {
        const key = `romaneio_${farmer?.id}_${selectedFair}_${format(date, 'yyyy-MM-dd')}`;
        localStorage.setItem(key, JSON.stringify(romaneioData));
        toast({
          title: "Romaneio Salvo!",
          description: "As informações do seu romaneio foram salvas localmente.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao Salvar",
          description: "Não foi possível salvar os dados do romaneio.",
        });
      }
    }
  };
  
  const generatePdf = () => {
    if (!farmer || !date || !selectedFair) return;
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Romaneio ${getFairDisplayName(selectedFair)}`, doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Agricultor: ${farmer.responsibleName || farmer.name}`, 40, 60);
    doc.text(`Sítio/Marca: ${farmer.name}`, 40, 75);
    doc.text(`Data: ${format(date, "dd/MM/yyyy", { locale: ptBR })}`, 40, 90);

    const filteredData = romaneioData.filter(item => item.fornecedor || item.quantidade);

    (doc as any).autoTable({
      startY: 110,
      head: [['#', 'Produto', 'Fornecedor Parceiro', 'Quantidade']],
      body: filteredData.map((item, index) => [
        index + 1,
        item.produto,
        item.fornecedor,
        item.quantidade,
      ]),
       headStyles: { 
         fillColor: [39, 78, 54], // primary
         fontSize: 10
       },
       bodyStyles: {
         fontSize: 9
       },
       columnStyles: {
        0: { cellWidth: 25, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 120 },
        3: { cellWidth: 80, halign: 'center' },
       },
       margin: { top: 100, left: 40, right: 40, bottom: 40 },
       didDrawPage: (data: any) => {
         // Footer
         const pageCount = doc.internal.pages.length;
         doc.setFontSize(8);
         doc.text('Página ' + String(pageCount), data.settings.margin.left, doc.internal.pageSize.height - 20);
       }
    });

    doc.save(`romaneio_${farmer.name}_${selectedFair}_${format(date, 'yyyy-MM-dd')}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!farmer || !date || !selectedFair) return;

    let shareText = `*Romaneio - ${getFairDisplayName(selectedFair)} - ${format(date, 'dd/MM/yyyy')}*\n\n`;
    shareText += `*Agricultor:* ${farmer.responsibleName || farmer.name}\n`;
    shareText += `*Sítio/Marca:* ${farmer.name}\n\n`;
    
    romaneioData.forEach((item, index) => {
        if(item.quantidade || item.fornecedor) {
            shareText += `*${item.produto}:*`;
            if (item.fornecedor) shareText += ` (Fornecedor: ${item.fornecedor})`;
            if (item.quantidade) shareText += ` - Qtd: ${item.quantidade}`;
            shareText += '\n';
        }
    });

    if (navigator.share) {
      await navigator.share({
        title: `Romaneio ${getFairDisplayName(selectedFair)}`,
        text: shareText,
      }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Romaneio Copiado!",
          description: "O texto do romaneio foi copiado para a área de transferência.",
        });
    }
  };


  if (!isUserLoaded || isLoading) {
    return <div className="flex justify-center items-center p-12"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (!farmer) {
    return <div className="container mx-auto p-6 text-center">Por favor, faça login como agricultor para acessar esta página.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <style>{`
        @media print {
          body, html {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body * { 
            visibility: hidden; 
            background: transparent !important;
            color: #000 !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          .print-container, .print-container * { 
            visibility: visible; 
          }
          .print-container { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%;
            margin: 0;
            padding: 20px;
          }
          .no-print { 
            display: none !important; 
          }
          .print-only {
            display: block !important;
          }
          .print-header, .print-item {
            display: block !important;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          thead {
            background-color: #f2f2f2 !important;
          }
        }
      `}</style>

      <div className="mb-4 no-print">
        <BackButton />
      </div>
      <div className="mb-6 no-print">
        <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
          Gerador de Romaneio
        </h1>
        <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">
          Crie, edite e exporte o romaneio para levar para a feira. Os dados são salvos automaticamente no seu navegador.
        </p>
      </div>

      <div ref={printRef} className="print-container">
        <Card>
          <CardHeader>
             <div className="flex flex-col md:flex-row gap-8 no-print p-4 border rounded-lg">
                <div className="flex-1 space-y-3">
                  <Label className="text-xl font-bold text-accent">Data da Feira</Label>
                   <Popover>
                        <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal text-base">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                        </PopoverContent>
                    </Popover>
                </div>
                {farmer.fairs.length > 0 && (
                <div className="flex-1 space-y-3">
                  <Label className="text-xl font-bold text-accent">Selecione a Feira</Label>
                  <RadioGroup value={selectedFair} onValueChange={setSelectedFair} className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {farmer.fairs.map(fair => (
                            <div key={fair} className="flex items-center space-x-2">
                                <RadioGroupItem value={fair} id={`fair-${fair}`} />
                                <Label htmlFor={`fair-${fair}`} className="font-normal text-base cursor-pointer">{getFairDisplayName(fair).replace('da Feira Orgânica ', 'Feira ')}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                )}
              </div>
              <div className="print-header pt-6 px-6">
                <CardTitle className="font-headline text-2xl text-center text-primary leading-tight">
                    <span>Romaneio</span>
                    <br className="sm:hidden"/>
                    <span> {getFairDisplayName(selectedFair)}</span>
                </CardTitle>
                <Separator className="my-4" />
                <div className="space-y-1 pl-1">
                    <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Agricultor:</span> {farmer.responsibleName || farmer.name}</p>
                    <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Sítio/Marca:</span> {farmer.name}</p>
                    <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Data:</span> {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : 'N/A'}</p>
                </div>
              </div>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="w-full">
              {/* Cabeçalho da Tabela */}
              <div className="grid grid-cols-[20px_1fr_100px_60px] sm:grid-cols-[30px_1fr_180px_80px] gap-2 border-b pb-2">
                <div className="p-2 text-center font-bold text-lg text-accent">#</div>
                <div className="font-bold text-lg">Produto</div>
                <div className="font-bold text-lg">Fornecedor</div>
                <div className="font-bold text-lg">Qtde</div>
              </div>
              {/* Itens da Tabela */}
              <div>
                {romaneioData.map((item, index) => (
                  <div key={index} className="grid grid-cols-[20px_1fr_100px_60px] sm:grid-cols-[30px_1fr_180px_80px] gap-2 items-center border-b last:border-b-0 py-2">
                    <div className="font-bold text-center text-accent">{index + 1}</div>
                    <div className="font-medium break-words leading-tight max-w-full text-sm">{item.produto}</div>
                    <div>
                      <Input
                        value={item.fornecedor}
                        onChange={(e) => handleInputChange(index, 'fornecedor', e.target.value)}
                        className="bg-card no-print border-primary/50 focus-visible:ring-primary/50 h-8"
                      />
                      <span className="print-only hidden">{item.fornecedor}</span>
                    </div>
                    <div>
                      <Input
                        value={item.quantidade}
                        onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
                        className="bg-card no-print border-primary/50 focus-visible:ring-primary/50 h-8"
                      />
                      <span className="print-only hidden">{item.quantidade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col md:flex-row gap-2 justify-end no-print p-6">
            <Button variant="outline" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Salvar Rascunho</Button>
            <Button variant="outline" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Compartilhar</Button>
            <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
            <Button onClick={generatePdf}><Download className="mr-2 h-4 w-4" /> Gerar PDF</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

