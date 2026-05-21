import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Glow blob top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.25)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        {/* Glow blob bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.2)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 600,
            color: "rgba(165,180,252,0.9)",
            letterSpacing: "0.1em",
            border: "1px solid rgba(99,102,241,0.35)",
            borderRadius: 100,
            padding: "10px 24px",
            background: "rgba(99,102,241,0.12)",
            marginBottom: 32,
          }}
        >
          Практика · На русском · Без кода
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            AI для бизнеса
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.45)",
              textAlign: "center",
              marginTop: 20,
              display: "flex",
            }}
          >
            Практические курсы по ChatGPT — без программирования
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
