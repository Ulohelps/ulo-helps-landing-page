import { api } from "../api/api";

export interface SearchCaregivers {
  page: number;
  limit: number;
  search?: string;
  serviceTypes?: string[];
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string;
  genders?: string;
  ethnicities?: string;
  languages?: string[];
  availability?: string;
  liveInAvailable?: boolean;
  status?: string;
}

export const caregiverService = {
  getCaregivers: async (params: any) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", (params.page ?? 1).toString());
    queryParams.append("limit", (params.limit ?? 10).toString());

    if (params.search) queryParams.append("search", params.search);
    if (params.location) queryParams.append("location", params.location);
    if (params.minSalary)
      queryParams.append("minSalary", params.minSalary.toString());
    if (params.maxSalary)
      queryParams.append("maxSalary", params.maxSalary.toString());

    if (params.serviceTypes) {
      const types = Array.isArray(params.serviceTypes)
        ? params.serviceTypes
        : params.serviceTypes.split(",");
      types.forEach((type: string) => queryParams.append("serviceTypes", type));
    }

    if (params.gender) queryParams.append("gender", params.gender);

    // ✅ Ethnicity: single value
    if (params.ethnicity) queryParams.append("ethnicity", params.ethnicity);

    // ✅ Languages: multiple values
    if (params.languages) {
      const langs = Array.isArray(params.languages)
        ? params.languages
        : params.languages.split(",");
      langs.forEach((lang: string) => queryParams.append("languages", lang));
    }

    if (params.experienceLevel)
      queryParams.append("experienceLevel", params.experienceLevel);

    return api.get(`/caregivers/search?${queryParams.toString()}`);
  },

  getSingleCaregiver: async (caregiverId: string) => {
    return api.get(`/caregivers/${caregiverId}`);
  },
  bookmarkCaregiver: async (caregiverId: string) => {
    return api.post(`/connections/${caregiverId}/bookmark`);
  },

  unbookmarkCaregiver: async (caregiverId: string) => {
    return api.post(`/connections/${caregiverId}/unbookmark`);
  },
  getBookmarkedCaregivers: async () => {
    return api.get(`/connections/bookmarks`);
  },
};
