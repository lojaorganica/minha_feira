import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'default' | 'large' | 'small';
}

const Logo = ({ size = 'default' }: LogoProps) => {
  const sizes = {
    large: 192,
    default: 128,
    small: 48,
  }
  const width = sizes[size] || sizes.default;
  const height = sizes[size] || sizes.default;

  return (
    <Link href="/welcome" className="flex items-center gap-2" prefetch={false}>
      <Image
        src="https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/oDCkRtc7/5602073687894b2087f96555f9248957"
        alt="Logo do Circuito de Feiras Orgânicas Carioca"
        width={width}
        height={height}
        className={cn(
          "rounded-full",
          size === 'large' && 'w-32 h-32 sm:w-48 sm:h-48',
          size === 'default' && 'w-10 h-10',
          size === 'small' && 'w-10 h-10'
        )}
      />
       <span className={cn(
        "font-headline font-semibold text-primary",
        (size === 'default' || size === 'small') && 'text-xl',
        size === 'large' && 'hidden' 
      )}>
        Feiras Orgânicas
      </span>
    </Link>
  );
};

export default Logo;
