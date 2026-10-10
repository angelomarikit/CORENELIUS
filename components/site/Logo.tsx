export function Logo({ className = "h-28 w-auto" }: { className?: string }) {
  return (
    <img
      src="/media/logo.png"
      alt="Corenelius Technologies and Construction, Inc."
      className={`object-contain ${className}`}
    />
  );
}
