import { create } from "zustand";

import type { User } from "../types/auth";

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;

  login: (
    user: User,
    access: string,
    refresh: string,
  ) => void;

  logout: () => void;

  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>(
  (set) => ({
    user: null,

    access: localStorage.getItem("access"),

    refresh: localStorage.getItem("refresh"),

    login: (user, access, refresh) => {
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      set({
        user,
        access,
        refresh,
      });
    },

    logout: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      set({
        user: null,
        access: null,
        refresh: null,
      });
    },

    setUser: (user) => {
      set({
        user,
      });
    },
  }),
);