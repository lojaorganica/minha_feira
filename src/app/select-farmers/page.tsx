import BackButton from '@/components/back-button';
import FarmerSelection from './_components/farmer-selection';

export default function SelectFarmersPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-start">
            <BackButton />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary">Bem-vindo(a)!</h1>
        <p className="text-xl font-semibold text-foreground/90 mt-2 max-w-3xl mx-auto">
          Selecione seus agricultores favoritos para ver os produtos deles.
           As compras dos alimentos são realizadas de forma direta com um agricultor de cada vez, pois os pagamentos são individualizados. As feiras são coletivas, mas cada família de agricultor possui sua renda separada.
        </p>
      </div>
      <FarmerSelection />
    </div>
  );
}
