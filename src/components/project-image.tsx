"use client";
import Image from "next/image";
import { useState } from "react";
export function ProjectImage({
  src,
  alt,
  priority,
  width,
  height,
}: {
  src: string;
  alt: string;
  priority: boolean;
  width?: number;
  height?: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className="image-error"
        role="img"
        aria-label={`Imagem indisponível: ${alt}`}
      >
        <span>IMAGEM INDISPONÍVEL</span>
        <small>A arte não pôde ser carregada.</small>
      </div>
    );
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 40vw"
      preload={priority}
      className="artwork-image"
      onError={() => setFailed(true)}
    />
  );
}
