import Image from "next/image";
import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="logo" aria-label="LS Design — início">
      <Image
        src="/assets/branding/LS_logo_branca_original.png"
        alt="LS Design"
        width={2048}
        height={2048}
        unoptimized
        className="brand-image"
      />
    </Link>
  );
}
