import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/components/providers/theme";

const Route = createRootRoute({ component: Root });

function Root() {
  return (
    <ThemeProvider>
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
}

export { Route };
