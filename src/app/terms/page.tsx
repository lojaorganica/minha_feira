
import BackButton from "@/components/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
    return (
        <div className="container mx-auto max-w-4xl py-6 px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
                <BackButton />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Termos e Condições de Uso – Minha Feira</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base md:text-lg text-foreground/90 font-semibold">
                    <p className="text-sm text-muted-foreground">Última atualização: 25 de Julho de 2024</p>
                    
                    <h3 className="font-headline text-xl text-primary pt-4">1. Sobre o Serviço</h3>
                    <p>
                        O Minha Feira é uma plataforma que conecta consumidores a agricultores e produtores do Circuito Carioca de Feiras Orgânicas, facilitando a compra antecipada de produtos. Atuamos como intermediários na comunicação e no pedido, mas não nos responsabilizamos pela produção, qualidade, pagamento, entrega ou retirada dos produtos. A transação financeira e a logística são de responsabilidade direta entre o cliente e o agricultor.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">2. Contas de Usuário</h3>
                    <p>
                        <strong>Clientes:</strong> Ao se cadastrar, você concorda em fornecer informações verdadeiras e atualizadas. Você é responsável por manter a confidencialidade de sua conta.
                    </p>
                    <p>
                        <strong>Agricultores:</strong> O cadastro está sujeito a verificação e aprovação. Você se compromete a fornecer informações precisas sobre seus produtos, preços e locais de feira.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">3. Conduta do Usuário</h3>
                    <p>
                        Você concorda em não usar o serviço para qualquer finalidade ilegal ou proibida por estes termos. Isso inclui, mas não se limita a, fraudar transações ou violar os direitos de outros usuários.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">4. Propriedade Intelectual</h3>
                    <p>
                        O conteúdo do aplicativo, incluindo o logotipo, design e textos (excluindo o conteúdo gerado pelo usuário, como dados de produtos), é de propriedade do Minha Feira e protegido por leis de direitos autorais.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">5. Limitação de Responsabilidade</h3>
                    <p>
                        O Minha Feira é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. Não somos responsáveis por perdas ou danos resultantes de transações diretas entre clientes e agricultores.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">6. Modificações nos Termos</h3>
                    <p>
                        Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre quaisquer alterações. O uso contínuo do aplicativo após as alterações constitui sua aceitação dos novos termos.
                    </p>

                    <h3 className="font-headline text-xl text-primary pt-4">7. Contato</h3>
                    <p>
                        Se tiver alguma dúvida sobre estes termos, entre em contato conosco pelo e-mail: comunicacao@essenciavital.org.br.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
