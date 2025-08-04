
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'default' | 'large' | 'small';
  isClickable?: boolean;
}

const Logo = ({ size = 'default', isClickable = true }: LogoProps) => {
  const sizes = {
    large: 256,
    default: 128,
    small: 64,
  }
  const width = sizes[size] || sizes.default;
  const height = sizes[size] || sizes.default;

  const LogoContent = (
    <>
      <Image
        src="https://assets.static-up.com/br-feiras-organicas-logo/1.0.0/logo.png"
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
         <span className="font-headline font-semibold text-primary text-2xl -mb-1">
          Minha Feira
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          Circuito Carioca de Feiras Orgânicas
        </span>
      </div>
    </>
  );
  
  if (isClickable) {
    return (
      <Link href="/welcome" className="flex items-center gap-3" prefetch={false}>
        {LogoContent}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {LogoContent}
    </div>
  );
};

export default Logo;
