export function Mark({ className = "h-11 w-11" }: { className?: string }) {
  return <img src="/media/logo-mark.png" alt="" className={`object-contain ${className}`} />;
}
