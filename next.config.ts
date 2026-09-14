import type { NextConfig } from "next";

// Photography is vendored into public/photos, so no remote image hosts are needed.
const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20% smaller than WebP at equal quality), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // 75 is the Next default and stays for incidental art; 90 is for the
    // full-bleed travel photography, where 75 shows visible softness.
    qualities: [75, 90],
  },
};

export default nextConfig;
