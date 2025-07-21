import { create } from "zustand";
import { caregiverService } from "../services/caregiverService";
import type { Caregiver, SearchCaregiversParams } from "@/types/caregiver";

interface CaregiverStoreState {
  caregivers: Caregiver[] | null;
  loading: boolean;
  error: string | null;
  searchParams: SearchCaregiversParams;
  totalResults: number;

  // Individual service states
  drivers: Caregiver[] | null;
  nannies: Caregiver[] | null;
  housekeepers: Caregiver[] | null;
  chefs: Caregiver[] | null;

  // Actions
  searchCaregivers: (params: Partial<SearchCaregiversParams>) => Promise<void>;
  resetSearch: () => void;
  setSearchParams: (params: Partial<SearchCaregiversParams>) => void;
  clearSearchParams: () => void;

  getDrivers: () => Promise<void>;
  getNannies: () => Promise<void>;
  getHousekeepers: () => Promise<void>;
  getChefs: () => Promise<void>;
  fetchByServiceType: (serviceType: string) => Promise<Caregiver[]>;
  getBookmarkedCaregivers: () => Promise<{ success: boolean; data: any }>;
}

export const useCaregiverStore = create<CaregiverStoreState>((set, get) => ({
  caregivers: null,
  drivers: null,
  nannies: null,
  housekeepers: null,
  chefs: null,
  loading: false,
  error: null,
  totalResults: 0,
  searchParams: {
    page: 1,
    limit: 10,
    search: "",
    serviceTypes: [],
    location: "",
    minSalary: 0,
    maxSalary: 0,
    experienceLevel: "",
    genders: [],
    ethnicities: [],
    languages: [],
    availability: "",
    liveInAvailable: undefined,
    status: "",
    workState: "",
  },

  searchCaregivers: async (params) => {
    set({ loading: true, error: null });
    try {
      // Merge new params with existing ones
      const currentParams = get().searchParams;
      const mergedParams = { ...currentParams, ...params };

      const response = await caregiverService.getCaregivers(mergedParams);

      set({
        caregivers: response.data,
        totalResults: response.data.length,
        searchParams: mergedParams,
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
        minSalary: 0,
        maxSalary: 0,
        experienceLevel: "",
        genders: [],
        ethnicities: [],
        languages: [],
        availability: "",
        liveInAvailable: undefined,
        status: "",
        workState: "",
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
        page: 1, // Reset to first page when filters change
      },
    }));
  },

  clearSearchParams: () => {
    set({
      searchParams: {
        page: 1,
        limit: 10,
        search: "",
        serviceTypes: [],
        location: "",
        minSalary: 0,
        maxSalary: 0,
        experienceLevel: "",
        genders: [],
        ethnicities: [],
        languages: [],
        availability: "",
        liveInAvailable: undefined,
        status: "",
        workState: "",
      },
    });
  },

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

  getBookmarkedCaregivers: async () => {
    try {
      const response = await caregiverService.getBookmarkedCaregivers();
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch connections";
      set({ error: errorMessage });
      return { success: false, data: [] };
    }
  },

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
