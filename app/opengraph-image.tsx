import { CONFIG } from "@/blog.config";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const robotoRegular = await fetch(
    new URL("./fonts/Roboto-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const robotoBold = await fetch(
    new URL("./fonts/Roboto-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          fontFamily: "Roboto",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative accent elements */}
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            background: "rgba(59, 130, 246, 0.05)",
            borderRadius: "50%",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            maxWidth: "900px",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              width: 60,
              height: 4,
              background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
              marginBottom: 30,
              borderRadius: 2,
            }}
          />

          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              letterSpacing: "-2px",
              color: "#ffffff",
              margin: 0,
              marginBottom: 20,
              padding: 0,
              lineHeight: 1.1,
            }}
          >
            {CONFIG.title}
          </h1>

          <p
            style={{
              fontSize: 24,
              color: "#94a3b8",
              margin: 0,
              marginBottom: 40,
              padding: 0,
              lineHeight: 1.5,
              maxWidth: "850px",
            }}
          >
            {CONFIG.description}
          </p>

          {/* Footer info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 4,
                height: 24,
                background: "linear-gradient(180deg, #3b82f6 0%, #06b6d4 100%)",
                borderRadius: 2,
              }}
            />
            <p style={{ fontSize: 18, color: "#cbd5e1", margin: 0, padding: 0 }}>
              {CONFIG.baseURL}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Roboto",
          data: robotoRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Roboto",
          data: robotoBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
