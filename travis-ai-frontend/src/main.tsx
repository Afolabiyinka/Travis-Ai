import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChatProvider } from "./modules/main/hooks/useChat.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SecondaryLoader from "./components/custom/secondaryloader.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <SecondaryLoader />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <App />
        </ChatProvider>
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);
