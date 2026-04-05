import Image from "next/image";

type Props = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function CmsImage({
  src,
  alt,
  className,
  width = 1200,
  height = 800,
  fill,
  sizes,
  priority,
}: Props) {
  if (!src) return null;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={
          src.includes("127.0.0.1") ||
          src.includes("localhost") ||
          src.includes("images.unsplash.com")
        }
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={
        src.includes("127.0.0.1") ||
        src.includes("localhost") ||
        src.includes("images.unsplash.com")
      }
    />
  );
}
