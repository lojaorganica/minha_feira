import type { SVGProps } from "react";

const DairyIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="m5 8 1.9 1.9" />
    <path d="M2 12h3" />
    <path d="m5 16-1.9 1.9" />
    <path d="M19.1 13.9 22 12" />
    <path d="M16 5h.01" />
    <path d="M19 8h.01" />
    <path d="M22 17h.01" />
    <path d="M19 19.5h.01" />
    <path d="m14 17-1 2" />
    <path d="M8.5 11.5 7 13" />
    <path d="m11 6 1 2" />
    <path d="M14 3.5v-2" />
    <path d="M2.24 16.8a2.5 2.5 0 0 0 3.51-.04l7.5-7.5a2.5 2.5 0 0 0-3.47-3.52l-7.5 7.5a2.5 2.5 0 0 0-.04 3.51Z" />
  </svg>
);

export default DairyIcon;
