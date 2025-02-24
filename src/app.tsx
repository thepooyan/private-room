import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { queryConfig } from "./utility/queries";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";

export let qc = new QueryClient(queryConfig);

export default function App() {

  return (
    <QueryClientProvider client={qc}>
      <ColorModeScript/>
      <ColorModeProvider initialColorMode="dark">
        <Router
          root={(props) => (
            <>
              <Suspense>{props.children}</Suspense>
            </>
          )}
        >
          <FileRoutes />
        </Router>
    </ColorModeProvider>
    </QueryClientProvider>
  );
}
