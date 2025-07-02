// src/stores/careseekersStore.ts
import { create } from "zustand";
import { careseekersService } from "../services/careseekersService";
import type {
  CareseekerProfile,
  ChangePasswordPayload,
  UpdateProfilePayload,
} from "@/types/careseekers";

interface CareseekerStoreState {
  profile: CareseekerProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  // Actions
  fetchProfile: () => Promise<CareseekerProfile>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<CareseekerProfile>;
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
  reset: () => void;
}

export const useCareseekersStore = create<CareseekerStoreState>((set, get) => ({
  profile: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await careseekersService.getProfile();

      set({
        profile: response.data,
        isLoading: false,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profile";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  updateProfile: async (payload) => {
    set({ isUpdating: true, error: null });
    try {
      const response = await careseekersService.updateProfile(payload);
      const updatedProfile = response.data.data;

      return updatedProfile;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Profile update failed";
      set({ error: errorMessage, isUpdating: false });
      throw new Error(errorMessage);
    }
  },

  changePassword: async (payload) => {
    set({ isUpdating: true, error: null });
    try {
      await careseekersService.changePassword(payload);
      set({ isUpdating: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password change failed";
      set({ error: errorMessage, isUpdating: false });
      throw new Error(errorMessage);
    }
  },

  uploadProfilePicture: async (file) => {
    set({ isUpdating: true, error: null });
    try {
      const response = await careseekersService.uploadProfilePicture(file);

      const profileImageUrl = response.data.data.profileImageUrl;
      set((state) => ({
        profile: state.profile
          ? {
              ...state.profile,
              profileImageUrl,
            }
          : null,
        isUpdating: false,
      }));

      return profileImageUrl;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Profile picture upload failed";
      set({ error: errorMessage, isUpdating: false });
      throw new Error(errorMessage);
    }
  },

  reset: () =>
    set({
      profile: null,
      isLoading: false,
      isUpdating: false,
      error: null,
    }),
}));
