import Link from "next/link";

const Logo = () => {
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
        className="h-6 w-6 text-primary"
      >
        <path d="M11 20A7 7 0 0 1 4 13H2a9 9 0 0 0 18 0h-2a7 7 0 0 1-7 7Z" />
        <path d="M12 13V3" />
        <path d="M15 6l-3-3-3 3" />
      </svg>
      <span className="font-headline text-xl font-semibold text-primary">Verdant Market</span>
    </Link>
  );
};

export default Logo;
