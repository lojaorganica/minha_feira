
'use client';

import BackButton from "@/components/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { FileArchive } from "lucide-react";
import Image from "next/image";

interface Document {
  title: string;
  imageUrl: string;
  documentUrl: string;
}

const documents: Document[] = [
  {
    title: "Decreto de Criação do Circuito Carioca de Feiras Orgânicas",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F01_CCFO_DECRETO_PREFEITO_DE_CRIACAO_DO_CIRCUITO_CARIOCA_CARIOCA_DE_FEIRAS_ORGANICAS_DIARIO_OFICIAL_26-01-2012.pdf?alt=media&token=a28f0987-e5f3-4334-aacd-00f2e716b6b2",
  },
  {
    title: "Resolução Conjunta que Regulamenta e Cria as 6 Primeiras Feiras",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F02_CCFO_RESOLUCAO_CONJUNTA_%20SEDES_SEOP_REGULAMENTA_CRIA_6_PRIMEIRAS_FEIRAS_ORGANICAS_DIARIO_OFICIAL_10_05_2012.pdf?alt=media&token=c8130b00-37c8-4025-b076-afb7b5449c2c",
  },
  {
    title: "Decreto de Criação de Mais 6 Feiras Orgânicas",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F03_CCFO_DECRETO_PREFEITO_DE_CRIACAO_DE_MAIS_6_FEIRAS_ORGANICAS_DIARIO_OFICIAL_05-12-2013.pdf?alt=media&token=cb357650-360b-49a5-a115-7e1455bffa7a",
  },
   {
    title: "Termo de Parceria para Gestão das Feiras",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F04_CCFO_TERMO_DE_PARCERIA_PARA_GESTAO_DAS_FEIRAS_SEDES_ESSENCIA_VITAL_03_10_2013.pdf?alt=media&token=99ba6e94-2a05-43d6-a408-162e1da9e096",
  },
  {
    title: "Regimento Interno e Governança das Feiras Orgânicas",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F05_CCFO_SEDES_REGIMENTO_INTERNO_CONSELHO_GESTOR_GOVERNANCA_DAS_FEIRAS_ORGANICAS_DIARIO_OFICIAL_20_04_2015.pdf?alt=media&token=98b926f8-6fb1-4716-a285-f5776ccfb595",
  },
  {
    title: "Resolução de Criação de Mais 8 Feiras Orgânicas",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F06_CCFO_RESOLUCAO_SMDEI_DE_CRIACAO_DE_MAIS_8_FEIRAS_ORGANICAS_DIARIO_OFICIAL_22_08_2017.pdf?alt=media&token=f693248d-1496-4750-92b3-a331738f5e4f",
  },
  {
    title: "Extinção do Conselho Gestor e Regimento Interno",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F07_CCFO_%20EXTINCAO_CONSELHO_GESTOR_REGIMENTO_INETRNO_DIARIO_OFICIAL16_06_2020.pdf?alt=media&token=7dcfdf4e-161d-4142-8a06-8deaa5b21493",
  },
  {
    title: "Lei Municipal para Proteção do Circuito",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F08_CCFO_LEI_MUNICIPAL_7149_APROVADA_PARA_PROTECAO_DO_CIRCUITO_26_11_2021.pdf?alt=media&token=517a27ae-5dfe-4741-a169-f8a11f4c630d",
  },
  {
    title: "Decreto de Transferência do Circuito para a Subsecretaria de Agricultura",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2F09_CCFO_DECRETO_PREFEITO_TRANSFERENCIA_DO_CIRCUITO_PARA_SUBAG_DIARIO_OFICIAL_06_08_2025.pdf?alt=media&token=3eb4446c-9992-403f-a795-c8c075cbe6a0",
  },
  {
    title: "Calendário do Circuito 2017",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2FCCFO_SMDEI_CALENDARIO_2017_DIARIO_OFICIAL_07_07_2017.pdf?alt=media&token=88eb6484-2922-4d8b-9620-c13e6feb6419",
  },
  {
    title: "Calendário do Circuito 2020",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2Fcapa_documentacoes_circuito.webp?alt=media&token=164da64b-b5bd-4554-9589-014c9e480ef3",
    documentUrl: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/documentacoes_circuito%2FCCFO_SMDEI_CALENDARIO_2020_DIARIO_OFICIAL_02_01_2020.pdf?alt=media&token=c640c873-88a4-4853-8cb3-fbae42eb8048",
  }
];

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl flex items-center gap-3">
          <FileArchive />
          Documentações do Circuito
        </h1>
        <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">
          Acesse aqui os documentos formais e legais sobre as Feiras Orgânicas do Circuito Carioca.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documents.map((doc, index) => (
          <a key={index} href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <CardContent className="p-4 space-y-3">
                <div className="relative aspect-[3/4] bg-muted rounded-md overflow-hidden">
                  <Image
                    src={doc.imageUrl}
                    alt={`Capa do documento ${doc.title}`}
                    fill
                    className="object-cover"
                    data-ai-hint="document cover"
                  />
                </div>
                <h2 className="text-lg font-bold font-headline text-primary text-center group-hover:text-accent">
                  {doc.title}
                </h2>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
