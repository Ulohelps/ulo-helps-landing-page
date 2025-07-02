// src/lib/stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";

interface User {
  id: string;
  phone: string;
  email: string;
  role: "CAREGIVER" | "CARESEEKER";
  emailVerified: boolean;
  phoneVerified: boolean;
  profileIncomplete: boolean;
  lastStep?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  step: number;
  isHydrated: boolean;
  error: string | null;

  setToken: (accessToken: string, refreshToken: string) => void;

  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: User }>;
  setStep: (step: number) => void;
  register: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string
  ) => Promise<{ success: boolean; user?: User }>;
  sendEmailVerification: (email: string) => Promise<void>;
  logout: () => void;
  sendOtp: (email: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: Partial<User>) => void;
  initialize: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,
      step: 1,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email, password });
          const { accessToken, refreshToken, ...userData } = response.data;

          set({
            user: userData,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, user: userData };
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Login failed",
          });
          throw error;
        }
      },

      register: async (email, firstName, lastName, password, phone) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register({
            email,
            firstName,
            lastName,
            password,
            phone,
          });
          const { accessToken, refreshToken, ...userData } = response.data;

          set({
            user: userData,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, user: userData };
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Registration failed",
          });
          throw error;
        }
      },

      sendEmailVerification: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await authService.sendEmailVerification(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to send verification",
          });
          throw error;
        }
      },

      setStep: (step) => set({ step }),

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          step: 1,
          error: null,
        });
      },

      sendOtp: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await authService.sendOtp(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Failed to send OTP",
          });
          throw error;
        }
      },

      verifyEmail: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
          await authService.verifyEmail({ email, otp });
          set((state) => ({
            user: state.user ? { ...state.user, emailVerified: true } : null,
            isLoading: false,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Verification failed",
          });
          throw error;
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        try {
          const response = await authService.refreshToken(refreshToken);
          set({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });
        } catch (error) {
          get().logout();
          throw error;
        }
      },
      setToken: (accessToken: string, refreshToken: string) => {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });

        try {
          const decoded = jwtDecode<User>(accessToken);
          set({
            user: decoded,
          });
        } catch (e) {
          console.error("Invalid token format");
        }
      },

      setUser: (user) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        }));
      },

      initialize: async () => {
        const { accessToken } = get();
        if (!accessToken) {
          set({ isHydrated: true });
          return;
        }

        try {
          const decodedToken = jwtDecode(accessToken);
          const isExpired = decodedToken.exp
            ? decodedToken.exp * 1000 < Date.now()
            : false;

          if (isExpired) {
            await get().refreshAccessToken();
          } else {
            set({
              user: decodedToken as User,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error("Initialization error:", error);
          get().logout();
        } finally {
          set({ isHydrated: true });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.initialize();
      },
    }
  )
);

export const authStore = useAuthStore;
