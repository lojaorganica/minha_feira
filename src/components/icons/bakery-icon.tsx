import type { SVGProps } from "react";

const BakeryIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.54 3.46a2 2 0 0 0 1.96 1.85h12.44a2 2 0 0 0 1.96-1.85l.54-3.46a2 2 0 0 0-1.34-2.23z" />
    <path d="M16 14v4" />
    <path d="M8 14v4" />
    <path d="M12 14v4" />
    <path d="M2 22h20" />
    <path d="M4 12a14.2 14.2 0 0 0 16 0" />
  </svg>
);

export default BakeryIcon;
