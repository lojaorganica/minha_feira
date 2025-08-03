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
    small: 40,
  }
  const width = sizes[size] || sizes.default;
  const height = sizes[size] || sizes.default;

  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image
        src="https://assets.static-up.com/unsafe/700x700/https://i.imgur.com/2Y3tQ7Z.png"
        alt="Logo do Circuito de Feiras Orgânicas Carioca"
        width={width}
        height={height}
        className={cn(
          "rounded-full",
          size === 'large' && 'w-32 h-32 sm:w-48 sm:h-48',
          size === 'default' && 'w-10 h-10',
          size === 'small' && 'w-8 h-8'
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
