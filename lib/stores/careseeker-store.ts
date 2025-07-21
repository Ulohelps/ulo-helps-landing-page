import { create } from "zustand";
import { careseekersService } from "../services/careseekersService";
import { subscriptionService } from "../services/subscriptionService";
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
  openServiceModal: boolean;

  // Actions
  fetchProfile: () => Promise<CareseekerProfile>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<CareseekerProfile>;
  changePassword: (
    payload: ChangePasswordPayload
  ) => Promise<{ success: boolean }>;
  deleteProfilePicture: () => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
  connectWithCaregiver: (caregiverId: string) => Promise<{ success: boolean }>;
  getConnectedCaregivers: () => Promise<{ success: boolean; data: any }>;
  getHiredCaregivers: () => Promise<{ success: boolean; data: any }>;
  getCurrentSubscription: () => Promise<{ success: boolean; data: any }>;
  reset: () => void;
  setOpenServiceModal: (service: boolean) => void;
}

export const useCareseekersStore = create<CareseekerStoreState>((set, get) => ({
  profile: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  openServiceModal: false,

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
    }
  },
  deleteProfilePicture: async () => {
    set({ isUpdating: true, error: null });
    try {
      await careseekersService.deleteProfilePicture();
      set((state) => ({
        profile: state.profile
          ? { ...state.profile, profileImageUrl: null }
          : null,
        isUpdating: false,
      }));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Profile picture deletion failed";
      set({ error: errorMessage, isUpdating: false });
    }
  },
  changePassword: async (payload) => {
    set({ isUpdating: true, error: null });
    try {
      await careseekersService.changePassword(payload);
      set({ isUpdating: false });
      return { success: true };
    } catch (error: any) {
      const errorMessage = error || "Password change failed";
      set({ error: errorMessage, isUpdating: false });
      return { success: false };
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
    }
  },
  connectWithCaregiver: async (caregiverId) => {
    set({ isUpdating: true, error: null });
    try {
      await careseekersService.connectWithCaregiver(caregiverId);
      set({ isUpdating: false });
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Connection failed";
      set({ error: errorMessage, isUpdating: false });
      return { success: false };
    }
  },
  getConnectedCaregivers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await careseekersService.getConnectedCaregivers();
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch connections";
      set({ error: errorMessage, isLoading: false });
      return { success: false, data: [] };
    }
  },
  getHiredCaregivers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await careseekersService.getHiredCaregiver();
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch connections";
      set({ error: errorMessage, isLoading: false });
      return { success: false, data: [] };
    }
  },
  getCurrentSubscription: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await subscriptionService.getCurrenctSubscription();
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch connections";
      set({ error: errorMessage, isLoading: false });
      return { success: false, data: [] };
    }
  },
  reset: () =>
    set({
      profile: null,
      isLoading: false,
      isUpdating: false,
      error: null,
    }),
  setOpenServiceModal: (service: boolean) => set({ openServiceModal: service }),
}));
