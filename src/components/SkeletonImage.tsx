"use client";

import Image from "next/image";
import { useState } from "react";

/** next/image with a shimmering skeleton until loaded */
export function SkeletonImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className ?? ""} transition-[opacity,filter] duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes={sizes}
        priority={priority}
        quality={100}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
