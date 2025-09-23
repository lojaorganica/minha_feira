
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
    title: "Decreto de Criação da Feira da Tijuca",
    imageUrl: "https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/6bpHSCv7/d7d2427f805a41a4a1ca25c839f1503c.png",
    documentUrl: "#",
  },
  {
    title: "Resolução Normativa para Feiras Orgânicas",
    imageUrl: "https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/6bpHSCv7/d7d2427f805a41a4a1ca25c839f1503c.png",
    documentUrl: "#",
  },
  {
    title: "Lei Estadual de Incentivo à Agricultura Familiar",
    imageUrl: "https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/6bpHSCv7/d7d2427f805a41a4a1ca25c839f1503c.png",
    documentUrl: "#",
  },
  {
    title: "Publicação Diário Oficial - Feira de Botafogo",
    imageUrl: "https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/6bpHSCv7/d7d2427f805a41a4a1ca25c839f1503c.png",
    documentUrl: "#",
  },
   {
    title: "Processo de Criação da Feira do Grajaú",
    imageUrl: "https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/6bpHSCv7/d7d2427f805a41a4a1ca25c839f1503c.png",
    documentUrl: "#",
  },
  {
    title: "Manual de Boas Práticas para Feirantes",
    imageUrl: "https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/6bpHSCv7/d7d2427f805a41a4a1ca25c839f1503c.png",
    documentUrl: "#",
  },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
