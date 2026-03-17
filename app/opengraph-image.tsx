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
          alignItems: "center",
          justifyContent: "space-between",
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
            maxWidth: "650px",
            flex: 1,
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
              maxWidth: "600px",
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

        {/* Bison Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            marginLeft: 40,
          }}
        >
          <svg
            viewBox="0 0 256 256"
            width="280"
            height="280"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
            }}
          >
            {/* Bison body - dark navy */}
            <g>
              {/* Back leg */}
              <rect x="160" y="180" width="24" height="76" fill="#0f172a" />
              {/* Back leg teal accent */}
              <rect x="168" y="180" width="16" height="76" fill="#4a7c7e" />
              {/* Front leg */}
              <rect x="72" y="180" width="24" height="76" fill="#0f172a" />
              {/* Torso - navy */}
              <ellipse cx="128" cy="130" rx="60" ry="50" fill="#0f172a" />
              {/* Torso - teal upper section */}
              <path
                d="M 80 100 Q 80 80 128 75 Q 170 80 170 100 Q 170 120 155 135 Q 128 145 100 135 Q 80 120 80 100"
                fill="#4a7c7e"
              />
              {/* Head/Shoulder - coral */}
              <ellipse cx="60" cy="100" rx="42" ry="48" fill="#d9826d" />
              {/* Head darker shading */}
              <ellipse cx="50" cy="95" rx="28" ry="30" fill="#c56d54" />
              {/* Horn - yellow */}
              <rect x="165" y="60" width="16" height="40" fill="#f4d35e" rx="2" />
              {/* Horn darker edge */}
              <rect x="169" y="60" width="8" height="40" fill="#e8c940" rx="2" />
              {/* Ear - dark */}
              <ellipse cx="175" cy="110" rx="12" ry="18" fill="#0f172a" />
              {/* Front face detail - dark */}
              <ellipse cx="20" cy="120" rx="18" ry="22" fill="#0f172a" />
            </g>
            {/* Eyes */}
            <rect x="35" y="85" width="12" height="12" fill="#0f172a" rx="1" />
            <rect x="45" y="95" width="12" height="12" fill="#0f172a" rx="1" />
          </svg>
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
