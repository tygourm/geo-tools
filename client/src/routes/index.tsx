import { createFileRoute } from "@tanstack/react-router";
import "maplibre-gl/dist/maplibre-gl.css";

import { AppMap } from "@/components/atoms/app-map";

const Route = createFileRoute("/")({ component: Index });

function Index() {
  return <AppMap />;
}

export { Route };
