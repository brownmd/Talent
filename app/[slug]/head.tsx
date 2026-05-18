type HeadProps = {
  params: Promise<{ slug: string }>;
};

const keplerPreloads = [
  { href: "/reports2/kepler_map_11.html", as: "document" },
  { href: "/vendor/kepler/keplergl.min.css", as: "style" },
  { href: "/vendor/mapbox/mapbox-gl.css", as: "style" },
  { href: "/vendor/maplibre/maplibre-gl.css", as: "style" },
  { href: "/vendor/react/react.production.min.js", as: "script" },
  { href: "/vendor/react/react-dom.production.min.js", as: "script" },
  { href: "/vendor/redux/redux.js", as: "script" },
  { href: "/vendor/react-redux/react-redux.min.js", as: "script" },
  { href: "/vendor/styled-components/styled-components.min.js", as: "script" },
  { href: "/vendor/kepler/keplergl.min.js", as: "script" },
] as const;

export default async function Head({ params }: HeadProps) {
  const { slug } = await params;

  if (slug !== "mapping-global-ai-activity-on-github") {
    return null;
  }

  return (
    <>
      {keplerPreloads.map((asset) => (
        <link key={asset.href} rel="preload" href={asset.href} as={asset.as} />
      ))}
    </>
  );
}