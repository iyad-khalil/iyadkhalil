import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import { useEffect } from "react";
import React from "react";
import Snowfall from "react-snowfall";
import SplashCursor from "./components/SplashCursor";

function Router() {
  // Scroll to top on route change
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="bg-background text-foreground">
          <SplashCursor />
          <Snowfall
            color="#9db4d3"
            snowflakeCount={160}
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
