
import FarmerSelection from './_components/farmer-selection';

export default function SelectFarmersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary">Selecione um Agricultor</h1>
        <p className="text-xl font-semibold text-foreground/90 mt-2 max-w-3xl mx-auto">
          Selecione um agricultor para ver os produtos dele.
           As compras dos alimentos são realizadas de forma direta com um agricultor de cada vez, pois os pagamentos são individualizados.
        </p>
      </div>
      <FarmerSelection />
    </div>
  );
}
