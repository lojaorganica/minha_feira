
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { suggestComplementaryProducts } from "@/ai/flows/suggest-complementary-products";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, useRef } from "react";
import { Loader2, Sparkles, Trash2, MessageSquare, Copy, Send, MapPin, Tractor, Upload, CheckCircle, Plus, Minus, X } from "lucide-react";
import { getProducts, getFarmerById } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrderHistory } from "@/hooks/use-order-history";
import { useUser } from "@/hooks/use-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";


function ComplementarySuggestions() {
  const { cartItems, addToCart } = useCart();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsLoading(true);
      const orderItems = cartItems.map(item => item.name);
      suggestComplementaryProducts({ orderItems })
        .then(result => {
          const allProducts = getProducts();
          const suggestionProducts = result.suggestions
            .map(suggestionName => allProducts.find(p => p.name.toLowerCase() === suggestionName.toLowerCase()))
            .filter((p): p is Product => Boolean(p));
          setSuggestions(suggestionProducts);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setSuggestions([]);
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold font-headline text-primary flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" />
        Você também pode gostar
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {suggestions.map(product => (
            <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-2">
                    <div className="relative aspect-[3/2] mb-2 bg-muted/30">
                        <Image src={product.image} alt={product.name} fill className="object-cover rounded-md" data-ai-hint={product.dataAiHint}/>
                    </div>
                    <h3 className="text-xl font-semibold truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-bold text-primary text-lg">R${product.price.toFixed(2).replace('.', ',')}</p>
                        <Button size="sm" onClick={() => handleAddToCart(product)}>Adicionar</Button>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
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

const renderQuantityControls = (product: any, updateQuantity: (id: string, q: number) => void) => {
    if (product.unit === 'kg') {
        const currentGrams = Math.round(product.quantity * 1000);
        return (
             <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, parseFloat((product.quantity - 0.1).toPrecision(12)))}>
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Diminuir 100g</span>
                </Button>
                <span className="font-bold text-lg min-w-16 text-center">{currentGrams} g</span>
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, parseFloat((product.quantity + 0.1).toPrecision(12)))}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Aumentar 100g</span>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, product.quantity - 1)}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Diminuir quantidade</span>
            </Button>
            <span className="font-bold text-lg w-10 text-center">{product.quantity}</span>
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, product.quantity + 1)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Aumentar quantidade</span>
            </Button>
        </div>
    );
};

const formatItemText = (item: any) => {
    if (item.unit === 'kg') {
        const grams = Math.round(item.quantity * 1000);
        return `- ${grams}g de ${item.name} (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})`;
    }
    return `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})`;
};

const getDisplayQuantity = (item: any) => {
    if (item.unit === 'kg') {
        if (item.quantity >= 1) {
            return `${item.quantity.toFixed(1)} kg`.replace('.', ',');
        }
        return `${Math.round(item.quantity * 1000)} g`;
    }
    return `${item.quantity}x`;
};


export default function CartView() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartLoaded, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const { user } = useUser();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [isProofAttached, setIsProofAttached] = useState(false);
  const [isSendDisabledAlertOpen, setSendDisabledAlertOpen] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const farmer = useMemo(() => {
    if (cartItems.length > 0) {
        const farmerId = cartItems[0].farmerId;
        return getFarmerById(farmerId);
    }
    return null;
  }, [cartItems]);

  const cartWithFarmerNames = useMemo(() => {
    return cartItems.map(item => ({
        ...item,
        farmerName: getFarmerById(item.farmerId)?.name || 'Agricultor desconhecido'
    }));
  }, [cartItems]);

  useEffect(() => {
    // Reset pickup location if farmer changes or has no fairs
    if (farmer && farmer.fairs.length > 0) {
      setPickupLocation(farmer.fairs[0]);
    } else {
      setPickupLocation('');
    }
  }, [farmer]);


  const shippingCost = useMemo(() => {
    if (deliveryOption === 'delivery' && farmer?.shippingCost) {
        return farmer.shippingCost;
    }
    return 0;
  }, [deliveryOption, farmer]);

  const finalTotal = cartTotal + shippingCost;


  const handleCopyPixKey = () => {
    if (farmer?.pixKey) {
        navigator.clipboard.writeText(farmer.pixKey);
        toast({
            title: 'Chave PIX copiada!',
            description: 'A chave PIX foi copiada para a área de transferência.',
        });
    }
  };

  const handleAttachProof = () => {
     // Simula a abertura do seletor de arquivos.
     // Em um app real, aqui você usaria <input type="file" />
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Simula que um arquivo foi selecionado.
    if (event.target.files && event.target.files.length > 0) {
        setIsProofAttached(true);
        toast({
            title: "Comprovante anexado!",
            description: "Seu comprovante foi anexado com sucesso. Agora você pode enviar o pedido.",
        });
    }
  };


  const handleSendOrder = () => {
    if (deliveryOption === 'pickup' && !pickupLocation) {
        toast({
            variant: 'destructive',
            title: "Local de retirada necessário",
            description: "Por favor, selecione a feira para retirar o seu pedido.",
        });
        return;
    }

    if (!farmer || !farmer.phone) {
        toast({
            variant: 'destructive',
            title: "Erro de contato",
            description: "O número de WhatsApp do agricultor não está disponível.",
        });
        return;
    }
    
    if (!user) {
        toast({
            variant: 'destructive',
            title: "Erro de usuário",
            description: "Não foi possível identificar o usuário. Por favor, tente novamente.",
        });
        return;
    }

    const orderItemsText = cartItems.map(formatItemText).join('\n');
    
    const deliveryText = deliveryOption === 'delivery' 
        ? `*Opção de Entrega:* Delivery (Frete: R$ ${shippingCost.toFixed(2).replace('.', ',')})` 
        : `*Opção de Entrega:* Retirar na Feira | Grátis\n*Local de Retirada:* ${getFairDisplayName(pickupLocation)}`;

    const messageText = message ? `\n*Observação:* ${message}` : '';

    const whatsappMessage =
`Olá, ${farmer.name}! 👋

Acabei de fazer um pedido pelo app *Minha Feira* e já realizei o pagamento via PIX. Segue o resumo:

*Itens do Pedido:*
${orderItemsText}

*Subtotal:* R$ ${cartTotal.toFixed(2).replace('.', ',')}
${deliveryText}
*Total do Pedido:* R$ ${finalTotal.toFixed(2).replace('.', ',')}
${messageText}

Estou enviando o comprovante nesta conversa. Aguardo a confirmação. Obrigado(a)!`;


    const whatsappUrl = `https://wa.me/${farmer.phone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      customerName: user.name,
      items: cartItems.map(item => ({ productName: item.name, quantity: item.quantity })),
      status: 'Pendente' as 'Pendente',
      total: finalTotal,
      date: new Date(),
      farmerName: farmer.name,
      deliveryOption: deliveryOption,
      ...(deliveryOption === 'delivery' && {
        customerContact: {
            address: user.address,
            phone: user.phone,
        }
      }),
      ...(deliveryOption === 'pickup' && {
        pickupLocation: getFairDisplayName(pickupLocation),
      })
    };
    addOrder(newOrder);

    toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi registrado e enviado ao agricultor. Não se esqueça de anexar o comprovante na conversa do WhatsApp.",
    });

    setTimeout(() => {
        clearCart();
        router.push('/welcome');
    }, 1500);
  };


  if (!isCartLoaded) {
    return (
        <div className="flex justify-center items-center h-full p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Seu carrinho está vazio</h2>
        <p className="text-lg font-semibold text-foreground/90 mt-2">Parece que você ainda não adicionou nada ao seu carrinho.</p>
        <Button asChild className="mt-6 text-base font-semibold">
          <Link href="/catalog">Comece a Comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
            <ul role="list" className="divide-y divide-border border-y border-border">
            {cartWithFarmerNames.map((product) => (
                <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted/30">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                            data-ai-hint={product.dataAiHint}
                        />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                                    {product.name}
                                </h3>
                                <div className="flex items-start gap-2 mt-1 text-sm text-muted-foreground font-semibold">
                                    <Tractor className="h-4 w-4 text-primary shrink-0" />
                                    <div>
                                        <p>Fornecedor:</p>
                                        <p className="font-bold text-foreground/90">{product.farmerName}</p>
                                    </div>
                                </div>
                                <p className="mt-1 text-lg font-semibold text-foreground/80">R${product.price.toFixed(2).replace('.', ',')} / {product.unit}</p>
                            </div>
                            <p className="text-base sm:text-xl font-bold text-foreground whitespace-nowrap ml-2">R${(product.price * product.quantity).toFixed(2).replace('.', ',')}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-base mt-2">
                            <div>{renderQuantityControls(product, updateQuantity)}</div>
                            <div className="flex">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => removeFromCart(product.id)}
                                    className="font-semibold text-destructive hover:text-destructive-foreground p-1 sm:p-2 h-auto"
                                >
                                    <Trash2 className="h-4 w-4 sm:mr-1"/>
                                    <span className="hidden sm:inline">Remover</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
             <div className="mt-4">
                <Button variant="outline" onClick={clearCart}>Limpar Carrinho</Button>
            </div>
        </section>

        <aside>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Resumo do pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Subtotal</span>
                        <span>R${cartTotal.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <Separator />

                    <RadioGroup defaultValue="pickup" onValueChange={(value: 'pickup' | 'delivery') => setDeliveryOption(value)} className="space-y-2">
                        <Label className="text-lg font-bold">Opções de Entrega</Label>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label htmlFor="pickup" className="font-semibold">
                                Pegar na Feira | <span className="text-accent">Grátis</span>
                            </Label>
                        </div>
                        {farmer?.shippingCost !== undefined && farmer.shippingCost > 0 && (
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="delivery" id="delivery" />
                                <Label htmlFor="delivery" className="font-semibold">Delivery</Label>
                            </div>
                        )}
                    </RadioGroup>

                    {deliveryOption === 'pickup' && farmer && farmer.fairs.length > 0 && (
                        <div className="space-y-3">
                             <Label className="text-2xl font-bold flex items-center gap-2 mb-2 text-accent">
                                <MapPin className="h-6 w-6 text-accent"/>
                                Onde você irá buscar?
                            </Label>
                            <RadioGroup value={pickupLocation} onValueChange={setPickupLocation} className="space-y-1 pl-4">
                                {farmer.fairs.map(fair => (
                                    <div key={fair} className="flex items-center space-x-3">
                                        <RadioGroupItem value={fair} id={`fair-${fair}`} />
                                        <Label htmlFor={`fair-${fair}`} className="font-normal text-xl cursor-pointer">{getFairDisplayName(fair)}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}
                    
                    <div className="flex justify-between text-lg text-foreground/80 font-bold">
                        <span>Estimativa de frete</span>
                        <span className={deliveryOption === 'pickup' ? 'text-muted-foreground' : ''}>
                           R${shippingCost.toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    <Separator />
                    <div className="flex justify-between font-bold text-xl">
                        <span>Total do pedido</span>
                        <span>R${finalTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                     {farmer?.pixKey && (
                        <>
                            <Separator />
                            <div className="flex flex-col gap-2 pt-2">
                                <p className="font-bold text-xl">Chave PIX</p>
                                <div className="flex items-center justify-between gap-2 rounded-md bg-muted px-3 py-2">
                                    <span className="font-mono text-base font-semibold text-foreground/80 break-all">{farmer.pixKey}</span>
                                    <Button size="icon" variant="ghost" onClick={handleCopyPixKey}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                     <div className="w-full text-center">
                        <p className="text-lg text-foreground/80">
                           Efetue o pagamento para a chave PIX e, em seguida, anexe o comprovante abaixo antes de enviar o pedido.
                        </p>
                    </div>
                    <Input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="image/*,.pdf" />
                    <Button 
                        variant="outline"
                        className="w-full text-base font-bold" 
                        size="lg"
                        onClick={handleAttachProof}
                        disabled={isProofAttached}
                    >
                        {isProofAttached ? (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500"/>
                                Comprovante Anexado
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2"/>
                                Anexar Comprovante
                            </>
                        )}
                    </Button>
                     <div 
                        className="w-full cursor-pointer"
                        onClick={(e) => {
                            if (!isProofAttached) {
                                e.stopPropagation();
                                setSendDisabledAlertOpen(true);
                            }
                        }}
                    >
                        <Button 
                            className="w-full text-base font-bold" 
                            size="lg" 
                            onClick={handleSendOrder}
                            disabled={!isProofAttached}
                        >
                           <Send className="h-4 w-4 mr-2"/>
                           ENVIAR PEDIDO
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                   <CardTitle className="flex items-center gap-2 font-headline">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span>Mensagem para o agricultor</span>
                        <span className="font-normal text-lg text-accent">(opcional)</span>
                   </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="message">Deixe uma observação para o agricultor:</Label>
                        <Textarea 
                            placeholder="Ex: Por favor, embale os tomates para presente." 
                            id="message" 
                            maxLength={500}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-card"
                        />
                        <p className="text-sm text-muted-foreground text-right">
                           {message.length} / 500
                        </p>
                    </div>
                </CardContent>
            </Card>

            <ComplementarySuggestions />

            <AlertDialog open={isSendDisabledAlertOpen} onOpenChange={setSendDisabledAlertOpen}>
                <AlertDialogContent>
                     <button
                        onClick={() => setSendDisabledAlertOpen(false)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-opacity"
                        aria-label="Fechar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Quase lá! Falta pouco para enviar seu pedido.</AlertDialogTitle>
                        <AlertDialogDescription className="text-lg">
                            Primeiro, efetue o pagamento para a chave PIX informada.
                            <br/><br/>
                            Depois, clique no botão <strong>"Anexar Comprovante"</strong> para selecionar o arquivo do seu comprovante. Só então o botão para enviar o pedido será habilitado.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </aside>
    </div>
  );
}

    
