import { create } from "zustand";
import { generateExcuse } from "@/utils/ai";

interface ChatType {
  id: string;
  prompt: string;
  message: string;
  title?: string;
}

interface ChatStore {
  chats: ChatType[];
  prompt: string;
  loading: boolean;
  setPrompt: (p: string) => void;
  setLoading: (l: boolean) => void;
  handleSend: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  prompt: "",
  loading: false,

  setPrompt: (p) => set({ prompt: p }),
  setLoading: (l) => set({ loading: l }),

  handleSend: async () => {
    const prompt = get().prompt;
    if (!prompt.trim()) return;

    set({ loading: true });

    try {
      const response: any = await generateExcuse(prompt);

      const newChat: ChatType = {
        id: crypto.randomUUID(),
        prompt,
        message: response || "",
      };

      set({ chats: [...get().chats, newChat], prompt: "" });
    } catch (error) {
      console.error("Failed to generate excuse:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
