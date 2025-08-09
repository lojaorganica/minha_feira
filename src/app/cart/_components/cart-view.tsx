
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
import { useEffect, useState, useMemo } from "react";
import { Loader2, Sparkles, Trash2, MessageSquare, Copy, Send, MapPin, Tractor } from "lucide-react";
import { getProducts, getFarmerById } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrderHistory } from "@/hooks/use-order-history";
import { useUser } from "@/hooks/use-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


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
                    <div className="relative aspect-square mb-2">
                        <Image src={product.image} alt={product.name} fill className="object-cover rounded-md" data-ai-hint={product.dataAiHint}/>
                    </div>
                    <h3 className="text-lg font-semibold truncate">{product.name}</h3>
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
    const deExceptions = ['Laranjeiras'];
    if (deExceptions.includes(fair)) {
        return `Feira de ${deExceptions}`;
    }
    return `Feira da ${fair}`;
}

export default function CartView() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartLoaded, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const { user } = useUser();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const router = useRouter();
  
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

    const orderItemsText = cartItems.map(item => `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})`).join('\n');
    
    const deliveryText = deliveryOption === 'delivery' 
        ? `*Opção de Entrega:* Delivery (Frete: R$ ${shippingCost.toFixed(2).replace('.', ',')})` 
        : `*Opção de Entrega:* Retirar na Feira (Frete Grátis)\n*Local de Retirada:* ${getFairDisplayName(pickupLocation)}`;

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
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
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
                        <div>
                            <div className="flex justify-between text-lg font-bold text-foreground">
                                <h3>
                                <a href="#">{product.name}</a>
                                </h3>
                                <p className="ml-4">R${(product.price * product.quantity).toFixed(2).replace('.', ',')}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground font-semibold">
                                <Tractor className="h-4 w-4 text-primary" />
                                <span>Fornecedor: {product.farmerName}</span>
                            </div>
                             <p className="mt-1 text-base font-semibold text-foreground/80">R${product.price.toFixed(2).replace('.', ',')} / {product.unit}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-base">
                            <div className="flex items-center gap-2">
                                <label htmlFor={`quantity-${product.id}`} className="sr-only">Quantidade</label>
                                <Input
                                    id={`quantity-${product.id}`}
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                    className="w-20 h-9 font-bold text-base"
                                />
                            </div>
                            <div className="flex">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => removeFromCart(product.id)}
                                    className="font-semibold text-destructive hover:text-destructive-foreground"
                                >
                                    <Trash2 className="h-4 w-4 mr-1"/>
                                    Remover
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
                <CardContent className="space-y-4 text-lg font-bold">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R${cartTotal.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <RadioGroup defaultValue="pickup" onValueChange={(value: 'pickup' | 'delivery') => setDeliveryOption(value)} className="text-base">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pickup" id="pickup" />
                                <Label htmlFor="pickup">Pegar na Feira</Label>
                            </div>
                            {farmer?.shippingCost !== undefined && farmer.shippingCost > 0 && (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="delivery" id="delivery" />
                                    <Label htmlFor="delivery">Delivery</Label>
                                </div>
                            )}
                        </RadioGroup>

                         {deliveryOption === 'pickup' && farmer && farmer.fairs.length > 0 && (
                            <div className="grid gap-2 text-base font-normal pl-6">
                                <Label htmlFor="pickup-location" className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4"/>Onde você irá buscar?</Label>
                                <Select onValueChange={setPickupLocation} value={pickupLocation}>
                                    <SelectTrigger id="pickup-location" className="text-base">
                                        <SelectValue placeholder="Selecione uma feira" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {farmer.fairs.map(fair => (
                                            <SelectItem key={fair} value={fair} className="text-base">{getFairDisplayName(fair)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    

                    <div className="flex justify-between text-foreground/80">
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
                        <p className="text-sm text-foreground/80">
                            Efetue o pagamento para a chave PIX e, em seguida, envie o pedido para compartilhar os detalhes e o comprovante com o agricultor.
                        </p>
                    </div>
                    <Button className="w-full text-base font-bold" size="lg" onClick={handleSendOrder}>
                       <Send className="h-4 w-4 mr-2"/>
                       ENVIAR PEDIDO
                    </Button>
                </CardFooter>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                   <CardTitle className="flex items-center gap-2 font-headline">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Mensagem para o agricultor
                   </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="message">Deixe uma observação para o agricultor (opcional):</Label>
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
        </aside>
    </div>
  );
}

