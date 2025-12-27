import React from "react";
import RoutesConfig from "./routes/routes-config";
import { useThemeStore } from "./store/theme/themeStore";
import { Toaster } from "sonner";

function App() {
  const { theme } = useThemeStore();
  React.useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.body.classList.add(systemTheme);

      return;
    }
  }, [theme]);
  return (
    <>
      <RoutesConfig />
      <Toaster
        position="top-right"
        theme={theme}
        toastOptions={{ style: { borderRadius: "20px" } }}
      />
    </>
  );
}

export default App;
