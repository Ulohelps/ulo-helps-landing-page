// stores/caregiver-store.ts
import { create } from "zustand";
import { api } from "../api/api";
import type {
  Caregiver,
  SearchCaregiversParams,
  CaregiverSearchResult,
} from "@/types/caregiver";
import { caregiverService } from "../services/caregiverService";

interface CaregiverStoreState {
  caregivers: Caregiver[];
  loading: boolean;
  error: string | null;
  searchParams: SearchCaregiversParams;
  totalResults: number;

  // Actions
  searchCaregivers: (params: SearchCaregiversParams) => Promise<void>;
  resetSearch: () => void;
  setSearchParams: (params: Partial<SearchCaregiversParams>) => void;
}

export const useCaregiverStore = create<CaregiverStoreState>((set, get) => ({
  caregivers: [],
  loading: false,
  error: null,
  totalResults: 0,
  hasMore: false,
  searchParams: {
    page: 1,
    limit: 10,
    search: "",
    serviceTypes: [],
    location: "",
  },

  searchCaregivers: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await caregiverService.getCaregivers(params);
      set({
        caregivers: response.data.caregivers,
        totalResults: response.data.total,
        searchParams: params,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to search caregivers",
        loading: false,
      });
      throw error;
    }
  },

  resetSearch: () => {
    set({
      caregivers: [],
      searchParams: {
        page: 1,
        limit: 10,
        search: "",
        serviceTypes: [],
        location: "",
      },
      totalResults: 0,
      error: null,
    });
  },

  setSearchParams: (params) => {
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        ...params,
        page: 1, // Reset to first page when params change
      },
    }));
  },
}));
