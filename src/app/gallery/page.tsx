
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import GalleryView from "./_components/gallery-view";

export default function GalleryPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-64px)]">
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
