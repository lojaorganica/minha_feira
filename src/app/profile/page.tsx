
import BackButton from "@/components/back-button";
import ProfileForm from "./_components/profile-form";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <BackButton />
            </div>
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl mb-8">
                Meu Perfil
            </h1>
            <Suspense fallback={
                <div className="flex justify-center items-center p-12">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            }>
                <ProfileForm />
            </Suspense>
        </div>
    );
}
