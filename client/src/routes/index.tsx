import { createFileRoute } from "@tanstack/react-router";
import "maplibre-gl/dist/maplibre-gl.css";

import { AppMap } from "@/components/atoms/app-map";
import { Chat } from "@/components/organisms/chat";
import { useMode } from "@/stores/chat";

const Route = createFileRoute("/")({ component: Index });

function Index() {
  const mode = useMode();

  return mode === "full" ? (
    <div className="flex h-full justify-center">
      <Chat />
    </div>
  ) : (
    <AppMap />
  );
}

export { Route };
