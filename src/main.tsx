import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/themeProvider"
import { SessionProvider } from "./context/SessionContext";
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionProvider>
        <Toaster />
        <RouterProvider router={router} />
      </SessionProvider>
    </ThemeProvider>
  </React.StrictMode>
);