import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { generateExcuse } from "@/utils/ai";
import useToastMessage from "../../../lib/useToastMsg";

interface ChatType {
  id: string;
  prompt: string;
  message: string;
  title?: string;
}

interface ChatContextType {
  chats: ChatType[];
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within the ChatProvider");
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { toastError } = useToastMessage();

  const [chats, setChats] = useState<ChatType[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const saved = localStorage.getItem("chats");
    if (saved) setChats(JSON.parse(saved));

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  async function handleSend() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response: any = await generateExcuse(prompt);

      const newChat: ChatType = {
        id: crypto.randomUUID(),
        prompt,
        message: response || "",
      };

      setChats((prev) => [...prev, newChat]);
      setPrompt("");
    } catch (error) {
      toastError("Failed to generate Excuse");
      console.error("Failed to generate excuse:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        prompt,
        setPrompt,
        handleSend,
        loading,
        setLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
