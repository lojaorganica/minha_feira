
"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

const publicPaths = [
    '/welcome',
    '/login/customer',
    '/login/farmer',
    '/register/farmer',
    '/register/farmer/security-check',
];

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showHeader = !publicPaths.includes(pathname);

    return (
        <>
            {showHeader && <Header />}
            <main className="flex-grow">
                {children}
            </main>
        </>
    )
}
