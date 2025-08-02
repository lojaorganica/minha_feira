import FarmerSelection from './_components/farmer-selection';

export default function SelectFarmersPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary">Bem-vindo(a)!</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Selecione seus agricultores favoritos para ver os produtos deles.
        </p>
      </div>
      <FarmerSelection />
    </div>
  );
}
