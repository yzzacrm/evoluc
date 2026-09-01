import { ImageResponse } from "next/og";

export const alt = "Evoluc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b0d12 0%, #12151d 55%, #1b1f2b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            evoluc
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#a6acba",
              letterSpacing: 6,
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            Construtora
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 44,
            fontWeight: 800,
            color: "#ffffff",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Construímos o lugar onde a sua história continua.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 24,
            color: "#dd7f26",
            fontWeight: 600,
          }}
        >
          Lançamentos na Zona Leste de São Paulo
        </div>
      </div>
    ),
    { ...size }
  );
}
