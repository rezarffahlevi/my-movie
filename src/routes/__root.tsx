import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "../components/navbar/Navbar";

export const Route = createRootRoute({
  component: App,
});

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 1, // 5 minutes
      retry:2,
      retryDelay: 1000 * 5 
    }
  }
});

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <RootComponent />
    </QueryClientProvider>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
