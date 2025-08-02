import type { SVGProps } from "react";

const FruitIcon = (props: SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <path d="M10 10a5 5 0 0 0-5 5h14a5 5 0 0 0-5-5Z" />
    <path d="M8 10a2 2 0 1 1 4 0" />
    <path d="M12 15V8" />
    <path d="M12 8a4.5 4.5 0 0 0 4.5-4.5c0-2-2.5-2.5-2.5-2.5S11.5 1.5 11.5 3.5A4.5 4.5 0 0 0 16 8" />
  </svg>
);

export default FruitIcon;
