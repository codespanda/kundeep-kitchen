/** The Indian "pure vegetarian" mark: a green dot inside a green square. */
export default function VegMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Vegetarian"
      className={`inline-flex size-3.5 shrink-0 items-center justify-center rounded-[2px] border-[1.5px] border-[#1b8a3a] ${className}`}
    >
      <span className="size-1.5 rounded-full bg-[#1b8a3a]" />
    </span>
  );
}
