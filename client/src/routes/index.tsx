import { createFileRoute } from "@tanstack/react-router";
import "maplibre-gl/dist/maplibre-gl.css";

import { AppMap } from "@/components/atoms/app-map";
import { Chat } from "@/components/organisms/chat";
import { useChat } from "@/hooks/use-chat";

const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { chatSelectors } = useChat();
  const mode = chatSelectors.useMode();
  return mode === "full" ? (
    <div className="flex h-full justify-center">
      <Chat />
    </div>
  ) : (
    <AppMap />
  );
}

export { Route };
