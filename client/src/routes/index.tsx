import { createFileRoute } from "@tanstack/react-router";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  FullscreenControl,
  Map,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";

import { useResolvedTheme } from "@/components/providers/theme";

const Route = createFileRoute("/")({ component: Index });

function Index() {
  const theme = useResolvedTheme();

  return (
    <Map
      initialViewState={{
        latitude: 48.39053,
        longitude: -4.48601,
        zoom: 8,
      }}
      mapStyle={
        theme === "dark"
          ? `${import.meta.env.TILESERVER_URL}/styles/dark/style.json`
          : `${import.meta.env.TILESERVER_URL}/styles/light/style.json`
      }
      attributionControl={false}
    >
      <ScaleControl position="top-right" />
      <ScaleControl position="top-right" unit="imperial" />
      <ScaleControl position="top-right" unit="nautical" />
      <FullscreenControl />
      <NavigationControl />
    </Map>
  );
}

export { Route };
