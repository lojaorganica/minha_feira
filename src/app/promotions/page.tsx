
import BackButton from "@/components/back-button";
import PromotionsCarousel from "@/components/promotions-carousel";
import { Separator } from "@/components/ui/separator";

export default function PromotionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
            Promoções da Semana
        </h1>
        <p className="mt-2 text-lg font-semibold text-foreground/90">Aproveite as ofertas especiais dos nossos agricultores.</p>
      </div>
      <Separator className="my-8" />
      <PromotionsCarousel />
    </div>
  );
}
