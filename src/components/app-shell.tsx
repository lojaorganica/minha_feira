
"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showHeader = pathname !== '/welcome';

    return (
        <>
            {showHeader && <Header />}
            <main className="flex-grow">
                {children}
            </main>
        </>
    )
}
