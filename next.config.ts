import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Mantenemos tus configuraciones de calidad de Next.js
    qualities: [50, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Autoriza las imágenes de prueba de Unsplash
      },
      {
        protocol: "https",
        hostname: "www.hipermaxi.com", // Ya lo dejamos listo para cuando uses imágenes reales del supermercado
      },
    ],
  },
};

export default nextConfig;