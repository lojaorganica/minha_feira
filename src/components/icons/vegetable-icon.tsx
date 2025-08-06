import type { SVGProps } from "react";

const VegetableIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M14.5 12.5a4.5 4.5 0 1 0-6.36-6.36 4.5 4.5 0 0 0 6.36 6.36Z" />
    <path d="m8.5 15.5 3-3" />
    <path d="M12.5 8.5 11 7" />
    <path d="M17 11.5 15.5 10" />
    <path d="m5 19 3-3" />
    <path d="M2.27 16.35c-1.22 1.23-.29 4.34 2.1 6.73 2.39 2.4 5.5 3.32 6.73 2.1" />
  </svg>
);

export default VegetableIcon;
