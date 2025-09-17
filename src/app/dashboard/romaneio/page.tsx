
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
import { CalendarIcon, Download, FileText, Loader2, Mic, Play, Printer, Save, Share2, StopCircle, AlertTriangle } from 'lucide-react';
import BackButton from '@/components/back-button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Separator } from '@/components/ui/separator';
import { processRomaneioAudio, ProcessRomaneioAudioOutput } from '@/ai/flows/process-romaneio-audio';
import { generateSpeech } from '@/ai/flows/text-to-speech';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"


interface RomaneioItem {
  produto: string;
  fornecedor: string;
  quantidade: string;
}

const getFairDisplayName = (fair: string): string => {
    if (!fair) return '';
    return `Feira Orgânica de ${fair}`;
}

export default function RomaneioPage() {
  const { user, isUserLoaded } = useUser();
  const farmer = user as Farmer | null;
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFair, setSelectedFair] = useState<string>('');
  const [romaneioData, setRomaneioData] = useState<RomaneioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [showMicAlert, setShowMicAlert] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  
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
    if (selectedFair && date && farmer?.id) {
      try {
        const key = `romaneio_${farmer?.id}_${selectedFair}_${format(date, 'yyyy-MM-dd')}`;
        const savedData = localStorage.getItem(key);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
           const currentProductNames = new Set(farmerProducts.map(p => p.name));
           const savedProductNames = new Set(parsedData.map((item: RomaneioItem) => item.produto));

           const fullData = [...parsedData];

           farmerProducts.forEach(product => {
               if (!savedProductNames.has(product.name)) {
                   fullData.push({
                       produto: product.name,
                       fornecedor: '',
                       quantidade: '',
                   });
               }
           });
           
           const finalData = fullData.filter(item => currentProductNames.has(item.produto));

          setRomaneioData(finalData);
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
        const initialData = farmerProducts.map(p => ({
          produto: p.name,
          fornecedor: '',
          quantidade: '',
        }));
        setRomaneioData(initialData);
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedFair, date, farmer, farmerProducts]);
  
  useEffect(() => {
    if (selectedFair && date && farmer?.id && !isLoading) {
       try {
        const key = `romaneio_${farmer?.id}_${selectedFair}_${format(date, 'yyyy-MM-dd')}`;
        const dataToSave = romaneioData.filter(item => item.quantidade || item.fornecedor);
        localStorage.setItem(key, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Falha ao salvar dados no localStorage", error);
      }
    }
  }, [romaneioData, selectedFair, date, farmer, isLoading]);

  const handleInputChange = (index: number, field: 'fornecedor' | 'quantidade', value: string) => {
    const updatedData = [...romaneioData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setRomaneioData(updatedData);
  };

  const handleSave = () => {
    if (selectedFair && date) {
      try {
        const key = `romaneio_${farmer?.id}_${selectedFair}_${format(date, 'yyyy-MM-dd')}`;
        const dataToSave = romaneioData.filter(item => item.quantidade || item.fornecedor);
        localStorage.setItem(key, JSON.stringify(dataToSave));
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
    doc.text(`Romaneio da Feira Orgânica de ${selectedFair}`, doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Agricultor: ${farmer.responsibleName || farmer.name}`, 40, 60);
    if(farmer.prepostos && farmer.prepostos.length > 0) {
      doc.text(`Prepostos: ${farmer.prepostos.join(', ')}`, 40, 75);
      doc.text(`Sítio/Marca: ${farmer.name}`, 40, 90);
      doc.text(`Data: ${format(date, "dd/MM/yyyy", { locale: ptBR })}`, 40, 105);
    } else {
      doc.text(`Sítio/Marca: ${farmer.name}`, 40, 75);
      doc.text(`Data: ${format(date, "dd/MM/yyyy", { locale: ptBR })}`, 40, 90);
    }
    

    const filteredData = romaneioData.filter(item => item.fornecedor || item.quantidade);

    (doc as any).autoTable({
      startY: 120,
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

    let shareText = `*Romaneio da Feira Orgânica de ${selectedFair} - ${format(date, 'dd/MM/yyyy')}*\n\n`;
    shareText += `*Agricultor:* ${farmer.responsibleName || farmer.name}\n`;
    if (farmer.prepostos && farmer.prepostos.length > 0) {
      shareText += `*Prepostos:* ${farmer.prepostos.join(', ')}\n`;
    }
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
        title: `Romaneio da Feira Orgânica de ${selectedFair}`,
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

  const playResponse = async (text: string) => {
    if (!text) return;
    
    toast({
        title: "Sofia Responde:",
        description: text,
    });
    
    try {
        const { audioDataUri } = await generateSpeech({
            text,
            voiceName: 'Erinome',
        });
        setAudioSrc(audioDataUri);
    } catch (error) {
        console.error('Erro ao gerar ou tocar a fala da Sofia:', error);
    }
 };


 const processAudioResult = async (result: ProcessRomaneioAudioOutput) => {
    let dataWithUpdates = [...romaneioData];
    let responseText = "";

    const updatedQuantitiesProducts: string[] = [];
    const updatedSuppliersProducts: string[] = [];
    const removedSuppliersProducts: string[] = [];

    if (result.conversationalResponse) {
        responseText = result.conversationalResponse;
    } else if (result.clearAll) {
        dataWithUpdates = dataWithUpdates.map(item => ({ ...item, quantidade: '', fornecedor: '' }));
        responseText = "Entendido. O romaneio foi limpo.";
    } else if (result.clearQuantitiesOnly) {
        dataWithUpdates = dataWithUpdates.map(item => ({ ...item, quantidade: '' }));
        responseText = "Ok, as quantidades foram limpas.";
    } else if (result.clearSuppliersOnly) {
        dataWithUpdates = dataWithUpdates.map(item => ({ ...item, fornecedor: '' }));
        responseText = "Certo, limpei os nomes dos fornecedores.";
    } else if (result.items && result.items.length > 0) {
        result.items.forEach(extractedItem => {
            const itemIndex = dataWithUpdates.findIndex(
                romaneioItem => romaneioItem.produto.toLowerCase() === extractedItem.product.toLowerCase()
            );

            if (itemIndex !== -1) {
                const currentItem = dataWithUpdates[itemIndex];
                let finalQuantity = currentItem.quantidade;
                let finalFornecedor = currentItem.fornecedor;

                // Lógica para Fornecedor
                if (extractedItem.fornecedor !== undefined) {
                    const newSupplier = extractedItem.fornecedor.trim();
                    if (newSupplier === '' && currentItem.fornecedor !== '') {
                        finalFornecedor = '';
                        if (!removedSuppliersProducts.includes(currentItem.produto)) {
                            removedSuppliersProducts.push(currentItem.produto);
                        }
                    } else if (newSupplier !== '' && newSupplier !== currentItem.fornecedor) {
                        finalFornecedor = newSupplier;
                        if (!updatedSuppliersProducts.includes(currentItem.produto)) {
                            updatedSuppliersProducts.push(currentItem.produto);
                        }
                    }
                }

                // Lógica para Quantidade
                if (extractedItem.quantity !== undefined && extractedItem.quantity.trim() !== '') {
                    const changeMatch = extractedItem.quantity.trim().match(/^([+-]?)(\d+(\.\d+)?)\s*(.*)/);
                    const currentMatch = currentItem.quantidade.trim().match(/^(\d+(\.\d+)?)\s*(.*)/);
                    const changeUnit = changeMatch ? (changeMatch[4]?.trim() || (currentMatch ? currentMatch[3]?.trim() : '')) : '';
                    
                    if (changeMatch) {
                        const operator = changeMatch[1];
                        const changeValue = parseFloat(changeMatch[2]);
                        const currentValue = currentMatch ? parseFloat(currentMatch[1]) : 0;
                        let newValue = 0;

                        if (operator === '+') newValue = currentValue + changeValue;
                        else if (operator === '-') newValue = Math.max(0, currentValue - changeValue);
                        else newValue = changeValue;

                        finalQuantity = newValue > 0 ? `${newValue} ${changeUnit}`.trim() : '';
                    } else {
                        finalQuantity = extractedItem.quantity.trim();
                    }
                    
                    if (finalQuantity !== currentItem.quantidade && !updatedQuantitiesProducts.includes(currentItem.produto)) {
                        updatedQuantitiesProducts.push(currentItem.produto);
                    }
                } else if (extractedItem.quantity !== undefined && extractedItem.quantity.trim() === '') {
                     finalQuantity = '';
                     if (currentItem.quantidade !== '' && !updatedQuantitiesProducts.includes(currentItem.produto)) {
                        updatedQuantitiesProducts.push(currentItem.produto);
                     }
                }


                dataWithUpdates[itemIndex] = {
                    ...currentItem,
                    quantidade: finalQuantity,
                    fornecedor: finalFornecedor,
                };
            }
        });

        // Construção da resposta falada
        const parts = [];
        if (updatedQuantitiesProducts.length > 0) {
            const plural = updatedQuantitiesProducts.length > 1;
            parts.push(`atualizei a${plural ? 's' : ''} quantidade${plural ? 's' : ''} de ${updatedQuantitiesProducts.join(', ')}`);
        }
        if (updatedSuppliersProducts.length > 0) {
            const plural = updatedSuppliersProducts.length > 1;
            parts.push(`adicionei o${plural ? 's' : ''} fornecedor${plural ? 'es' : ''} para ${updatedSuppliersProducts.join(', ')}`);
        }
        if (removedSuppliersProducts.length > 0) {
            const plural = removedSuppliersProducts.length > 1;
            parts.push(`removi o${plural ? 's' : ''} fornecedor${plural ? 'es' : ''} de ${removedSuppliersProducts.join(', ')}`);
        }

        if (parts.length > 0) {
            responseText = "Ok. " + parts.join('. E também, ').replace(/^\w/, c => c.toUpperCase()) + '.';
        }
    } 
    
    if (!responseText) {
       responseText = "Não identifiquei nenhuma alteração para fazer.";
    }
    
    setRomaneioData(dataWithUpdates);
    await playResponse(responseText);
  };

  const startRecording = async () => {
    if (isRecording || isProcessingAudio) return;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('API de mídia não suportada neste navegador.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setShowMicAlert(false);

      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        audioPlayer-Ref.current.play().catch(() => {}); // Play silent audio to unlock
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setIsProcessingAudio(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const result = await processRomaneioAudio({
              audioDataUri: base64Audio,
              productList: farmerProducts.map(p => p.name)
            });
            await processAudioResult(result);
          } catch (e) {
            console.error(e);
            await playResponse("Ocorreu um erro ao processar o áudio. Por favor, tente novamente.");
          } finally {
            setIsProcessingAudio(false);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Erro ao iniciar a gravação:", err);
      setIsRecording(false);
      setShowMicAlert(true);
      toast({
        variant: "destructive",
        title: "Permissão de Microfone Negada",
        description: "O acesso ao microfone foi negado. Verifique as configurações do seu navegador.",
        duration: 8000,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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

       {showMicAlert && (
            <Alert variant="destructive" className="mb-6 no-print">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Acesso ao Microfone Bloqueado</AlertTitle>
                <AlertDescription>
                    Para usar a gravação por voz, você precisa permitir o acesso ao microfone nas configurações do seu navegador. 
                    Procure por 'Configurações do site' e libere o acesso para este aplicativo. Após liberar, clique no botão para gravar novamente.
                </AlertDescription>
            </Alert>
        )}

      <div ref={printRef} className="print-container">
        <Card>
          <CardHeader className="px-2 sm:px-6">
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
                                <Label htmlFor={`fair-${fair}`} className="font-normal text-base cursor-pointer">{`Feira Orgânica de ${fair}`}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                )}
              </div>
              <div className="print-header pt-6 px-1 sm:px-2 md:px-4">
                <CardTitle className="font-headline text-2xl text-center text-primary leading-tight">
                    Romaneio da Feira Orgânica de {selectedFair}
                </CardTitle>
                <Separator className="my-4" />
                 <div className="space-y-1 p-2 md:p-0">
                    <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Agricultor:</span> {farmer.responsibleName || farmer.name}</p>
                    {farmer.prepostos && farmer.prepostos.length > 0 && (
                       <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Prepostos:</span> {farmer.prepostos.join(', ')}</p>
                    )}
                    <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Sítio/Marca:</span> {farmer.name}</p>
                    <p className="font-semibold text-foreground/90 text-base"><span className="font-bold text-accent">Data:</span> {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : 'N/A'}</p>
                </div>
              </div>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="w-full overflow-x-auto">
              {/* Cabeçalho da Tabela */}
              <div className="grid grid-cols-[25px_1fr_100px_60px] sm:grid-cols-[30px_1fr_180px_80px] gap-2 border-b pb-2">
                <div className="p-2 text-center font-bold text-lg text-accent">#</div>
                <div className="font-bold text-lg">Produto</div>
                <div className="font-bold text-lg">Fornecedor</div>
                <div className="font-bold text-lg text-center">Qtde</div>
              </div>
              {/* Itens da Tabela */}
              <div>
                {romaneioData.map((item, index) => (
                  <div key={index} className="grid grid-cols-[25px_1fr_100px_60px] sm:grid-cols-[30px_1fr_180px_80px] gap-2 items-center border-b last:border-b-0 py-2">
                    <div className="font-bold text-center text-accent">{index + 1}</div>
                    <div className="font-medium break-words leading-tight max-w-full text-sm sm:text-base">{item.produto}</div>
                    <div>
                      <Input
                        value={item.fornecedor}
                        onChange={(e) => handleInputChange(index, 'fornecedor', e.target.value)}
                        className="bg-card no-print border-2 border-primary/50 focus-visible:ring-primary/50 h-8 text-sm"
                      />
                      <span className="print-only hidden">{item.fornecedor}</span>
                    </div>
                    <div>
                      <Input
                        value={item.quantidade}
                        onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
                        className="bg-card no-print border-2 border-primary/50 focus-visible:ring-primary/50 h-8 text-center font-bold text-base sm:text-lg px-0"
                      />
                      <span className="print-only hidden text-center">{item.quantidade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col md:flex-row gap-2 justify-end no-print p-6">
             <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button variant="outline" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Salvar</Button>
                <Button variant="outline" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Compartilhar</Button>
                <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
                <Button onClick={generatePdf}><Download className="mr-2 h-4 w-4" /> PDF</Button>
            </div>
          </CardFooter>
        </Card>
      </div>

       {/* Player de áudio centralizado e estável */}
       <audio 
            ref={audioPlayerRef} 
            src={audioSrc || undefined} 
            autoPlay 
            onEnded={() => setAudioSrc(null)}
            className="hidden" 
        />


       {/* Botão de Gravação Flutuante */}
      <div className="fixed bottom-6 right-6 no-print z-50">
        <Button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
            onTouchEnd={stopRecording}
            disabled={isProcessingAudio}
            size="icon"
            className={cn(
                "rounded-full h-16 w-16 shadow-lg transition-all duration-300 transform",
                isRecording 
                    ? "bg-red-600 hover:bg-red-700 animate-pulse scale-110" 
                    : "bg-accent hover:bg-accent/90 hover:scale-110"
            )}
            aria-label={isRecording ? "Solte para parar" : "Pressione e segure para gravar"}
        >
            {isProcessingAudio ? (
                <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
                <Mic className="h-8 w-8" />
            )}
        </Button>
      </div>
      
    </div>
  );
}
