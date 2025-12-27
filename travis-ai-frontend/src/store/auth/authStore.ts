import type { AuthUser } from "@/modules/auth/types/types";
import { create } from "zustand";

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

function getStoredToken() {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
}
function getStoredUser() {
  const stored = localStorage.getItem("user");
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: getStoredUser(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user: user });
  },
  token: getStoredToken(),
  setToken: (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    set({ token: token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
