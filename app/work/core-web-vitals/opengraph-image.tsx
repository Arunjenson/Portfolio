import { ImageResponse } from "next/og";
import { coreWebVitals as cs } from "@/lib/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = cs.title;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0a09",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#34d399", letterSpacing: 2 }}>
          Case study · {cs.company}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 68, color: "#f5f5f4", letterSpacing: -2 }}>
            {cs.titleLines[0]}
          </div>
          <div style={{ fontSize: 68, color: "#34d399", letterSpacing: -2 }}>
            {cs.titleLines[1]}
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#a8a29e" }}>
          <span>900+ URLs passing</span>
          <span style={{ color: "#44403c" }}>·</span>
          <span>75% into passing range</span>
          <span style={{ color: "#44403c" }}>·</span>
          <span>INP 800ms → 280ms</span>
        </div>
      </div>
    ),
    size
  );
}
