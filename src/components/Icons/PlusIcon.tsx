export default function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path
        d="M12 5V19M5 12H19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
