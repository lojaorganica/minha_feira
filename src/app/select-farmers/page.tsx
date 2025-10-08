
import BackButton from '@/components/back-button';
import FarmerSelection from './_components/farmer-selection';

export default function SelectFarmersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-4">
            <BackButton />
      </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">Nossos Agricultores e Fornecedores</h1>
        <p className="text-lg font-semibold text-foreground/90 mt-2 max-w-3xl">
          Selecione um agricultor ou fornecedor para ver os produtos dele. As compras são realizadas de forma direta com um agricultor de cada vez.
        </p>
      </div>
      <FarmerSelection />
    </div>
  );
}
