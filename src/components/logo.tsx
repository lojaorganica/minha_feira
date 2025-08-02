import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'default' | 'large';
}

const Logo = ({ size = 'default' }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "text-primary",
          size === 'default' && 'h-6 w-6',
          size === 'large' && 'h-24 w-24'
        )}
      >
        <path d="M11 20A7 7 0 0 1 4 13H2a9 9 0 0 0 18 0h-2a7 7 0 0 1-7 7Z" />
        <path d="M12 13V3" />
        <path d="M15 6l-3-3-3 3" />
      </svg>
      <span className={cn(
        "font-headline font-semibold text-primary",
        size === 'default' && 'text-xl',
        size === 'large' && 'text-4xl'
      )}>
        Mercado Verdante
      </span>
    </Link>
  );
};

export default Logo;
