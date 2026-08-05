import Image from "next/image";

type Props = {
  gradient: [string, string];
  emoji: string;
  image?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  sizes?: string;
  priority?: boolean;
};

const emojiSize = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-8xl",
};

export default function ProductArt({
  gradient,
  emoji,
  image,
  alt = "",
  className = "",
  size = "md",
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
}: Props) {
  const [from, to] = gradient;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
          <span className={`${emojiSize[size]} drop-shadow-sm select-none`}>{emoji}</span>
        </>
      )}
    </div>
  );
}
