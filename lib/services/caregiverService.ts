import { api } from "../api/api";

interface SearchCaregivers {
  page: number;
  limit: number;
  search?: string;
  serviceTypes?: string[];
  location?: string;
  minSalary?: number;
  maxSalary?: number;
}

export const caregiverService = {
  getCaregivers: async (params: SearchCaregivers) => {
    // Convert params to URLSearchParams for GET request
    const queryParams = new URLSearchParams();

    queryParams.append("page", params.page.toString());
    queryParams.append("limit", params.limit.toString());

    if (params.search) queryParams.append("search", params.search);
    if (params.location) queryParams.append("location", params.location);
    if (params.minSalary)
      queryParams.append("minSalary", params.minSalary.toString());
    if (params.maxSalary)
      queryParams.append("maxSalary", params.maxSalary.toString());

    if (params.serviceTypes?.length) {
      params.serviceTypes.forEach((type) =>
        queryParams.append("serviceTypes", type)
      );
    }

    return api.get(`/caregivers/search?${queryParams.toString()}`);
  },
};
