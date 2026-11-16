import { useState } from 'react';
import { Satellite } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function ResilientImage({ src, alt, caption, className = '' }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200 border border-slate-200 text-slate-600 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Satellite className="w-8 h-8 text-sky-600 mb-2" aria-hidden="true" />
        <p className="text-sm font-medium text-slate-800">{caption || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
