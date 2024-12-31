import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import { ThemeProvider } from "@/components/themeProvider";

const Providers = () => {

  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
