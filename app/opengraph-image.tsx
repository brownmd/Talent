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
          background: "linear-gradient(135deg, #05232e 0%, #0a3a4a 50%, #0d4a5e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          fontFamily: "Roboto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot-grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #c97e67 0%, #f6d76f 50%, #325763 100%)",
          }}
        />

        {/* Glow orb top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            background: "radial-gradient(circle, rgba(50,87,99,0.45) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Glow orb bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -80,
            width: 420,
            height: 420,
            background: "radial-gradient(circle, rgba(201,126,103,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Left content panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
            flex: 1,
            padding: "60px 70px",
            maxWidth: 680,
          }}
        >
          {/* Category tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#f6d76f",
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f6d76f",
              }}
            >
              Talent · AI · Strategy
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 68,
              fontWeight: "bold",
              letterSpacing: "-1.5px",
              color: "#ffffff",
              margin: 0,
              marginBottom: 22,
              padding: 0,
              lineHeight: 1.05,
            }}
          >
            {CONFIG.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 22,
              color: "#a8c4cc",
              margin: 0,
              marginBottom: 44,
              padding: 0,
              lineHeight: 1.55,
              maxWidth: 560,
            }}
          >
            {CONFIG.description}
          </p>

          {/* URL pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 100,
              padding: "10px 20px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#c97e67",
              }}
            />
            <span style={{ fontSize: 17, color: "#cbd5e1", letterSpacing: "0.02em" }}>
              {CONFIG.baseURL}
            </span>
          </div>
        </div>

        {/* Right logo panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            width: 340,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Logo background circle */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 532 532"
            width="240"
            height="240"
            style={{
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
              position: "relative",
              zIndex: 1,
            }}
          >
            <path style={{ fill: "#325763" }} d="M356.174 448.659h33.391V337.354l-77.407-44.016z" />
            <path style={{ fill: "#05232e" }} d="M66.783 364.248v84.41h33.391v-77.913c41.491 0 76.354-28.377 86.239-66.783L65.67 241.53c0 33.391 1.113 87.931 1.113 122.718zM33.394 192.659C14.949 192.66 0 207.609 0 226.051v44.524c18.419 0 33.353-14.913 33.391-33.323l.002-.07 17.25-22.921z" />
            <path style={{ fill: "#c97e67" }} d="m148.969 94.813-49.774 8.546c-36.196 6.255-65.803 41.439-65.803 78.169v11.13c.002 0 .002 44.524.002 44.524l-.002.07v77.841H0v133.565h33.391v-77.913a88.8 88.8 0 0 0 33.391-6.497c25.915-10.494 45.776-32.814 52.846-60.286h69.589l44.522 33.391h44.522l47.861-133.565c-57.879-36.275-121.879-75.232-177.153-108.975z" />
            <path style={{ fill: "#05232e" }} d="M467.478 114.746h-50.564c-13.916-35.911-50.307-57.214-92.718-50.009l-45.935 7.88v292.564l44.522 83.478h33.391V337.354h33.391l11.785-66.783h32.737v33.391h33.391l22.261-33.391c12.295 0 22.261-9.966 22.261-22.261v-89.043c0-24.487-20.035-44.521-44.522-44.521z" />
            <path style={{ fill: "#f6d76f" }} d="M467.478 170.398V81.354h-33.391v89.044h18.922z" />
            <path style={{ fill: "#05232e" }} d="M77.913 192.656h33.391v33.391H77.913zm44.522 44.522h33.391v33.391h-33.391z" />
            <path style={{ fill: "#325763" }} d="M278.261 203.789V72.617l-43.533 7.474-85.759 14.723c10.546 61.871 64.414 108.975 129.292 108.975z" />
          </svg>
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.06)",
          }}
        />
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
