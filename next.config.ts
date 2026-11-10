import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/lp/terras-raras-vila-carrao",
        destination: "/empreendimentos/terras-raras-vila-carrao",
        permanent: true,
      },
      {
        // O Mega Feirão da Casa Própria (10 e 11/10/2026) já acabou;
        // qualquer link antigo (anúncio, QR code, etc.) vai direto para o
        // empreendimento que era o foco da campanha.
        source: "/feirao-da-casa-propria",
        destination: "/empreendimentos/terras-raras-vila-carrao",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
