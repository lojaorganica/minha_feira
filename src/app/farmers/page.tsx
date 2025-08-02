import FarmersMap from '@/components/farmers-map';
import { getFarmers } from '@/lib/data';

export default function FarmersPage() {
  const farmers = getFarmers();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="font-headline text-4xl mb-4 text-primary">Encontre Nossos Agricultores</h1>
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md">
            <p className="text-lg text-foreground/80">
            Para exibir o mapa interativo das localizações dos agricultores, é necessária uma chave de API do Google Maps.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
            Por favor, crie um arquivo <code className="font-code bg-muted px-1 py-0.5 rounded">.env.local</code> na raiz do seu projeto e adicione a seguinte linha:
            </p>
            <pre className="mt-2 text-left bg-muted p-4 rounded-md overflow-x-auto">
            <code className="font-code text-foreground">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="SUA_CHAVE_DE_API_AQUI"
            </code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
            Depois de adicionar a chave, reinicie o servidor de desenvolvimento.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div>
        <div className="py-12 text-center bg-primary/10">
            <h1 className="font-headline text-4xl mb-2 text-primary">Localizações dos Nossos Agricultores</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">Explore as localizações dos nossos dedicados agricultores orgânicos e veja de onde vêm os seus alimentos.</p>
        </div>
        <FarmersMap farmers={farmers} apiKey={apiKey} />
    </div>
  );
}
