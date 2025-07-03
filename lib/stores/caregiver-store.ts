import { create } from "zustand";
import { caregiverService } from "../services/caregiverService";
import type { Caregiver, SearchCaregiversParams } from "@/types/caregiver";

interface CaregiverStoreState {
  caregivers: Caregiver[];
  loading: boolean;
  error: string | null;
  searchParams: SearchCaregiversParams;
  totalResults: number;

  // Individual service states
  drivers: Caregiver[];
  nannies: Caregiver[];
  housekeepers: Caregiver[];
  chefs: Caregiver[];

  // Actions
  searchCaregivers: (params: SearchCaregiversParams) => Promise<void>;
  resetSearch: () => void;
  setSearchParams: (params: Partial<SearchCaregiversParams>) => void;

  getDrivers: () => Promise<void>;
  getNannies: () => Promise<void>;
  getHousekeepers: () => Promise<void>;
  getChefs: () => Promise<void>;
  fetchByServiceType: (serviceType: string) => Promise<Caregiver[]>;
}

export const useCaregiverStore = create<CaregiverStoreState>((set, get) => ({
  caregivers: [],
  drivers: [],
  nannies: [],
  housekeepers: [],
  chefs: [],
  loading: false,
  error: null,
  totalResults: 0,
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
        page: 1,
      },
    }));
  },

  // Reusable function to fetch by service type
  fetchByServiceType: async (serviceType: string) => {
    try {
      const response = await caregiverService.getCaregivers({
        page: 1,
        limit: 10,
        serviceTypes: [serviceType],
      });
      return response.data;
    } catch (error: any) {
      console.error(`Failed to fetch ${serviceType}:`, error);
      return [];
    }
  },

  // Individual loaders
  getDrivers: async () => {
    const data = await get().fetchByServiceType("DRIVER");
    set({ drivers: data });
  },
  getNannies: async () => {
    const data = await get().fetchByServiceType("CHILDCARE_NANNY");
    set({ nannies: data });
  },
  getHousekeepers: async () => {
    const data = await get().fetchByServiceType("HOUSEKEEPER");
    set({ housekeepers: data });
  },
  getChefs: async () => {
    const data = await get().fetchByServiceType("CHEF");
    set({ chefs: data });
  },
}));
