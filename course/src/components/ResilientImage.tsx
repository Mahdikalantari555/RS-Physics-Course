import { useEffect, useState } from "react";
import { Satellite } from "lucide-react";
import { resolveAssetUrl } from "@/lib/base-path";

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function ResilientImage({ src, alt, caption, className = "" }: ResilientImageProps) {
  const resolvedSrc = resolveAssetUrl(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [resolvedSrc]);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center border border-line bg-paper p-6 text-center text-muted ${className}`}
        role="img"
        aria-label={alt}
      >
        <Satellite className="mb-2 size-8 text-cane" aria-hidden="true" />
        <p className="text-sm font-medium text-ink-soft">{caption || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
