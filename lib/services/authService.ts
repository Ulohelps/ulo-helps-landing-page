import { api } from "../api/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

interface VerifyEmailPayload {
  email: string;
  otp: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (payload: LoginPayload) => {
    return api.post("/auth/careseeker/login", payload);
  },

  register: async (payload: RegisterPayload) => {
    return api.post("/auth/careseeker/register", payload);
  },

  sendEmailVerification: async (email: string) => {
    return api.post("/auth/careseeker/pre-register", { email });
  },

  sendOtp: async (email: string) => {
    return api.post("/auth/verify/email/send", { email });
  },

  verifyEmail: async (payload: VerifyEmailPayload) => {
    return api.post("/auth/verify/email", payload);
  },

  refreshToken: async (refreshToken: string) => {
    return api.post("/auth/refresh", { refreshToken });
  },
};
