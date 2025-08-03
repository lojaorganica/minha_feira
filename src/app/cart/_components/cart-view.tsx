
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { suggestComplementaryProducts } from "@/ai/flows/suggest-complementary-products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Loader2, Sparkles, Trash2, Upload, MessageSquare } from "lucide-react";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

export default function CartView() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartLoaded, clearCart } = useCart();
  const [proof, setProof] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [message, setMessage] = useState("");

  const handleProofUploadClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'application/pdf')) {
      setProof(file);
      toast({
        title: "Comprovante anexado",
        description: `${file.name} foi selecionado.`,
      });
      // Aqui você adicionaria a lógica para enviar o pedido como "Concluído"
    } else {
      toast({
        variant: 'destructive',
        title: "Arquivo inválido",
        description: "Por favor, selecione um arquivo JPG ou PDF.",
      });
    }
  }


  if (!isCartLoaded) {
    return (
        <div className="flex justify-center items-center p-12">
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
          <Link href="/">Comece a Comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
            <ul role="list" className="divide-y divide-border border-y border-border">
            {cartItems.map((product) => (
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
                                    className="font-semibold text-accent hover:text-accent/80"
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
                    <div className="flex justify-between text-foreground/80">
                        <span>Estimativa de frete</span>
                        <span>R$5,00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-xl">
                        <span>Total do pedido</span>
                        <span>R${(cartTotal + 5).toFixed(2).replace('.', ',')}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept="image/jpeg,application/pdf"
                    />
                    <Button className="w-full text-base font-bold" size="lg" onClick={handleProofUploadClick}>
                        <Upload className="h-4 w-4 mr-2"/>
                        Pague com PIX e anexe o comprovante
                    </Button>
                    {proof && <p className="text-sm text-muted-foreground mt-2">Arquivo: {proof.name}</p>}
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

    