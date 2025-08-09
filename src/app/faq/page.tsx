
import BackButton from "@/components/back-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const faqClientes = [
    {
        question: "Como funciona o processo de compra?",
        answer: "É simples! Primeiro, selecione o agricultor de quem deseja comprar. Navegue pelos produtos dele, adicione os itens ao carrinho e vá para a finalização da compra. Lá, você encontrará a chave PIX do agricultor. Após fazer o pagamento, envie o pedido pelo app, o que gerará uma mensagem para o WhatsApp do agricultor. Anexe o comprovante do PIX na conversa do WhatsApp para confirmar."
    },
    {
        question: "Posso comprar de vários agricultores ao mesmo tempo?",
        answer: "Não. As compras são feitas individualmente por agricultor. Como o pagamento é direto para cada um, você precisa finalizar um carrinho de compras com um agricultor antes de começar um novo pedido com outro. Se tentar adicionar um item de um agricultor diferente, o app perguntará se você deseja limpar o carrinho atual."
    },
    {
        question: "Como é feito o pagamento?",
        answer: "O pagamento é feito diretamente ao agricultor via PIX. Na página do seu carrinho, você verá a chave PIX do agricultor escolhido. O app funciona como uma ponte para facilitar o pedido, mas a transação financeira é uma relação direta entre você e o produtor."
    },
    {
        question: "Quais são as opções de entrega?",
        answer: "Existem duas opções: você pode escolher retirar seu pedido em uma das feiras listadas pelo agricultor (sem custo de frete) ou, se o agricultor oferecer, pode optar por receber por delivery (com custo de frete)."
    },
    {
        question: "O que devo fazer após enviar o pedido pelo app?",
        answer: "Após clicar em 'Enviar Pedido', o app abrirá o WhatsApp com uma mensagem pronta para o agricultor. O passo mais importante é anexar o seu comprovante de pagamento do PIX nesta conversa. O seu pedido só será confirmado pelo agricultor após o recebimento do comprovante."
    },
     {
        question: "Como sei que meu pedido foi confirmado pelo agricultor?",
        answer: "A confirmação final do seu pedido e os detalhes sobre a retirada ou entrega serão combinados diretamente com o agricultor pela conversa no WhatsApp. O status 'Pendente' no seu histórico de pedidos do app indica que o pedido foi registrado, mas a confirmação oficial vem do contato direto."
    }
];

const faqAgricultores = [
    {
        question: "Como funciona o recebimento dos pedidos?",
        answer: "Quando um cliente finaliza um pedido, você recebe uma mensagem no seu WhatsApp cadastrado com todos os detalhes: itens, quantidades, valor total e dados do cliente. O cliente foi instruído a anexar o comprovante do PIX na mesma conversa."
    },
    {
        question: "Como gerencio meus produtos (preços, promoções, etc.)?",
        answer: "No seu 'Painel do Agricultor', acesse a aba 'Meus Produtos'. Lá você pode editar os detalhes de cada item (nome, preço, unidade), pausar um produto para que ele não apareça no catálogo, e até mesmo colocá-lo em promoção por um período de 7 dias."
    },
    {
        question: "Como recebo o pagamento dos clientes?",
        answer: "O pagamento é feito diretamente na sua Chave PIX que você cadastrou no seu perfil. É fundamental que esta chave esteja sempre correta e atualizada para que você possa receber os pagamentos sem problemas."
    },
    {
        question: "Como confirmo um pedido?",
        answer: "A confirmação do pedido é feita diretamente ao cliente através da conversa no WhatsApp, após você verificar o recebimento do pagamento via PIX. Você pode combinar os detalhes finais da entrega ou retirada por lá."
    },
    {
        question: "É possível gerenciar os clientes que compram de mim?",
        answer: "Sim! Na aba 'Meus Clientes' do seu painel, você pode ver uma lista de todos os clientes que já fizeram pedidos com você. Além disso, você pode classificá-los em categorias (Bronze, Prata, Ouro, Diamante) para ajudar a identificar e fidelizar seus compradores mais recorrentes."
    }
];


export default function FaqPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
                <BackButton />
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Perguntas Frequentes (FAQ)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Para Clientes</h2>
                         <Accordion type="single" collapsible className="w-full">
                           {faqClientes.map((faq, index) => (
                             <AccordionItem value={`item-c-${index}`} key={index}>
                                <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-foreground/90 font-semibold">
                                  {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                           ))}
                        </Accordion>
                    </div>

                    <Separator />

                     <div>
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">Para Agricultores</h2>
                         <Accordion type="single" collapsible className="w-full">
                           {faqAgricultores.map((faq, index) => (
                             <AccordionItem value={`item-a-${index}`} key={index}>
                                <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-foreground/90 font-semibold">
                                  {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                           ))}
                        </Accordion>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
