export default function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#667085"
      {...props}
    >
      <path d="M4 2V8H12L10 5L12 2H4Z" fill="#667085" />
      <path
        d="M4 14V8M4 8V2H12L10 5L12 8H4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
