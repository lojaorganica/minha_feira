import BackButton from "@/components/back-button";
import CartView from "./_components/cart-view";

export default function CartPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4">
                <BackButton />
            </div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Carrinho de Compras
                </h1>
            </div>
            <CartView />
        </div>
    );
}
