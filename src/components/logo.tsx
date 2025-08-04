import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'default' | 'large' | 'small';
}

const Logo = ({ size = 'default' }: LogoProps) => {
  const sizes = {
    large: 256,
    default: 128,
    small: 64,
  }
  const width = sizes[size] || sizes.default;
  const height = sizes[size] || sizes.default;

  return (
    <Link href="/welcome" className="flex items-center gap-3" prefetch={false}>
      <Image
        src="https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/oDCkRtc7/5602073687894b2087f96555f9248957"
        alt="Logo do Circuito de Feiras Orgânicas Carioca"
        width={width}
        height={height}
        className={cn(
          "rounded-full",
          size === 'large' && 'w-48 h-48 sm:w-64 sm:h-64',
          size === 'default' && 'w-16 h-16',
          size === 'small' && 'w-12 h-12'
        )}
      />
       <div className={cn(
        "flex flex-col",
        size === 'large' && 'hidden'
      )}>
         <span className="font-headline font-semibold text-primary text-xl -mb-1">
          Minha Feira
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          Circuito Carioca de Feiras Orgânicas
        </span>
      </div>
    </Link>
  );
};

export default Logo;
