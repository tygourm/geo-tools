import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { greetingsApi } from "@/api/greetings";
import { ThemeMenu } from "@/components/atoms/theme-menu";
import { logger } from "@/lib/logs";
import { greetingsActions, greetingsSelectors } from "@/stores/greetings";

const Route = createFileRoute("/")({ component: Index });

function Index() {
  const greeting = greetingsSelectors.useGreeting();
  const { data, error } = greetingsApi.useGreetings();

  useEffect(() => {
    if (data) {
      logger.info(data);
      greetingsActions.setGreeting(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      logger.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <div className="flex gap-4">
        <img src={viteLogo} className="size-8" />
        <ThemeMenu />
        <img src={reactLogo} className="size-8" />
      </div>
      {greeting && <p>{greeting}</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export { Route };
