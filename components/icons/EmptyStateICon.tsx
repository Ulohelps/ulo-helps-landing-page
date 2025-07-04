export default function EmptyStateIcon() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="80" fill="#F3F4F6" />

      <circle cx="100" cy="70" r="30" fill="#E5E7EB" />
      <path
        d="M100 110C120 110 140 125 140 150H60C60 125 80 110 100 110Z"
        fill="#E5E7EB"
      />

      <circle
        cx="150"
        cy="150"
        r="25"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeDasharray="5 5"
      />
      <path
        d="M140 140L125 125"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M50 50H70M60 60V40"
        stroke="#6B7280"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <rect x="40" y="170" width="120" height="10" rx="5" fill="#E5E7EB" />
    </svg>
  );
}
