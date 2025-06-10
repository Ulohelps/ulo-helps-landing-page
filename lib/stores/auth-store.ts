import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  phone: string;
  email?: string;
  role: "CAREGIVER" | "CARESEEKER";
  emailVerified: boolean;
  phoneVerified: boolean;
  profileIncomplete: boolean;
  lastStep?: string;
}
interface PersonalDetailsForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  step: number;
  isHydrated: boolean;
  // Actions
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
    phone?: string
  ) => Promise<{ success: boolean; user?: User }>;
  sendEmailVerification: (email: string) => Promise<void>;
  logout: () => void;
  sendOtp: (email: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: User) => void;
  initialize: () => Promise<void>;
}

const API_BASE_URL =
  "https://ulo-v1-stagging-be-b9a3d3832785.herokuapp.com/api/v1";
// "https://ulo-v1-stagging-be-b9a3d3832785.herokuapp.com/api/v1"
// "http://localhost:3200/api/v1";

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
      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const response = await fetch(
            `${API_BASE_URL}/auth/careseeker/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          if (data.success) {
            const { accessToken, refreshToken, ...userData } = data.data;

            set({
              user: userData,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true, user: userData };
          } else {
            throw new Error(data.message || "Login failed");
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      sendEmailVerification: async (email: string) => {
        const response = await fetch(
          `${API_BASE_URL}/auth/careseeker/pre-register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send OTP");
        }
      },
      register: async (
        email: string,
        firstName: string,
        lastName: string,
        password: string,
        phone?: string
      ) => {
        set({ isLoading: true });

        try {
          const response = await fetch(
            `${API_BASE_URL}/auth/careseeker/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password, firstName, lastName }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Registration failed");
          }

          if (data.success) {
            const { accessToken, refreshToken, ...userData } = data.data;

            set({
              user: userData,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });

            return { success: true, user: userData };
          } else {
            throw new Error(data.message || "Registration failed");
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      setStep: (step: number) => {
        set({ step });
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      sendOtp: async (email: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/verify/email/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send OTP");
        }
      },

      verifyEmail: async (email: string, otp: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/verify/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Email verification failed");
        }

        // Update user's phone verification status
        const { user } = get();
        if (user) {
          set({
            user: { ...user, phoneVerified: true },
          });
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Refresh token is invalid, logout user
          get().logout();
          throw new Error("Session expired");
        }

        set({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },
      initialize: async () => {
        const { accessToken } = get();
        if (!accessToken) {
          set({ isHydrated: true });
          return;
        }

        try {
          // Verify token expiration client-side
          const decodedToken = jwtDecode(accessToken);
          const isExpired = decodedToken.exp
            ? decodedToken.exp * 1000 < Date.now()
            : false;

          if (isExpired) {
            const { refreshToken } = get();
            if (refreshToken) {
              await get().refreshAccessToken();
            } else {
              get().logout();
            }
          } else {
            set({
              user: decodedToken as User,
              isAuthenticated: true,
              isHydrated: true,
            });
          }
        } catch (error) {
          get().logout();
        } finally {
          set({ isHydrated: true });
        }
      },
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
        state && (state.isHydrated = true);
      },
    }
  )
);
