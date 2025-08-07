import BackButton from "@/components/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
                <BackButton />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Política de Privacidade – Minha Feira</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base md:text-lg text-foreground/90 font-semibold">
                     <p className="text-sm text-muted-foreground">Última atualização: 25 de Julho de 2024</p>
                    
                    <h3 className="font-headline text-xl text-primary pt-4">1. Informações que Coletamos</h3>
                    <p>
                        Coletamos as seguintes informações para fornecer e melhorar nosso serviço:
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Dados de Cadastro:</strong> Nome, e-mail, telefone e endereço (para clientes que optam por delivery). Para agricultores, coletamos dados sobre o negócio, como nome da fazenda, endereço, chave PIX e locais de feira.</li>
                            <li><strong>Dados de Pedidos:</strong> Histórico de produtos que você compra ou visualiza.</li>
                            <li><strong>Dados de Uso:</strong> Informações sobre como você interage com nosso aplicativo, como quais páginas visita.</li>
                        </ul>
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">2. Como Usamos Suas Informações</h3>
                    <p>
                        Usamos suas informações para:
                         <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Operar e manter o serviço (ex: processar seu login).</li>
                            <li>Facilitar a comunicação entre você e os agricultores para a conclusão dos pedidos.</li>
                            <li>Personalizar sua experiência no aplicativo.</li>
                            <li>Enviar comunicações importantes sobre sua conta ou pedidos.</li>
                            <li>Cumprir obrigações legais.</li>
                        </ul>
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">3. Compartilhamento de Informações</h3>
                    <p>
                        Suas informações são compartilhadas apenas quando necessário para a operação do serviço:
                         <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Com os Agricultores:</strong> Se você é um cliente, compartilhamos seu nome e os detalhes do seu pedido com o agricultor selecionado. Se optar por delivery, seu endereço e telefone também serão compartilhados.</li>
                            <li><strong>Com os Clientes:</strong> Se você é um agricultor, suas informações de contato profissional (nome da fazenda, telefone, chave PIX) são visíveis para os clientes para viabilizar o pagamento e a comunicação.</li>
                        </ul>
                         <p className="mt-2">Não vendemos suas informações pessoais a terceiros.</p>
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">4. Segurança dos Dados</h3>
                    <p>
                        Implementamos medidas de segurança para proteger suas informações contra acesso, alteração ou destruição não autorizados. No entanto, nenhum sistema é 100% seguro.
                    </p>
                     
                    <h3 className="font-headline text-xl text-primary pt-4">5. Seus Direitos (LGPD)</h3>
                    <p>
                        Você tem o direito de acessar, corrigir, excluir ou solicitar a portabilidade de seus dados pessoais. Para exercer esses direitos, entre em contato conosco.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">6. Retenção de Dados</h3>
                    <p>
                        Manteremos suas informações enquanto sua conta estiver ativa ou conforme necessário para cumprir nossas obrigações legais.
                    </p>
                    
                    <h3 className="font-headline text-xl text-primary pt-4">7. Alterações nesta Política</h3>
                    <p>
                        Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política no aplicativo.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">8. Contato</h3>
                    <p>
                        Se tiver dúvidas sobre esta política de privacidade, entre em contato pelo e-mail: comunicacao@essenciavital.org.br.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
