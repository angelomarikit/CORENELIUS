import Image from "next/image";

export function Photo({
  src,
  alt,
  className = "object-cover",
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) return null;
  if (!src.startsWith("/")) {
    return <img src={src} alt={alt} className={`h-full w-full ${className}`} />;
  }
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} quality={85} className={className} />;
}
