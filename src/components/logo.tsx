import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'default' | 'large';
}

const Logo = ({ size = 'default' }: LogoProps) => {
  const width = size === 'large' ? 192 : 128;
  const height = size === 'large' ? 192 : 128;

  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image
        src="https://assets.static-up.com/unsafe/700x700/https://i.imgur.com/2Y3tQ7Z.png"
        alt="Logo do Circuito de Feiras Orgânicas Carioca"
        width={width}
        height={height}
        className={cn(
          "rounded-full",
          size === 'large' ? 'w-48 h-48' : 'w-10 h-10'
        )}
      />
       <span className={cn(
        "font-headline font-semibold text-primary",
        size === 'default' && 'text-xl',
        size === 'large' && 'hidden' 
      )}>
        Feiras Orgânicas
      </span>
    </Link>
  );
};

export default Logo;
