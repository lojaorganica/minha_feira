
import BackButton from "@/components/back-button";
import FavoritesView from "./_components/favorites-view";

export default function FavoritesPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4">
                <BackButton />
            </div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Meus Produtos Favoritos
                </h1>
                <p className="mt-2 text-base font-medium text-foreground/90 max-w-3xl">
                    Aqui estão seus produtos preferidos, organizados por agricultor para facilitar suas compras.
                </p>
            </div>
            <FavoritesView />
        </div>
    );
}
