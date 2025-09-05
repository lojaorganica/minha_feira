
import BackButton from "@/components/back-button";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import GalleryView from "./_components/gallery-view";

export default function GalleryPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4 flex-shrink-0">
                <BackButton />
            </div>
            <div className="mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Galeria de Propagandas
                </h1>
                <p className="mt-2 text-base font-medium text-foreground/90 max-w-3xl">
                    Utilize estas artes para divulgar as feiras em suas redes sociais. Use os filtros para encontrar a propaganda ideal.
                </p>
            </div>
            <Suspense fallback={
                <div className="flex justify-center items-center p-12 h-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            }>
                <GalleryView />
            </Suspense>
        </div>
    );
}
