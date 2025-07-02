// types/caregiver.ts
export interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  serviceTypes: string[];
  location: string;
  salary: number;
  profileImageUrl?: string;
  rating?: number;
  // Add other caregiver fields as needed
}

export interface SearchCaregiversParams {
  page: number;
  limit: number;
  search?: string;
  serviceTypes?: string[];
  location?: string;
  minSalary?: number;
  maxSalary?: number;
}

export interface CaregiverSearchResult {
  caregivers: Caregiver[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
