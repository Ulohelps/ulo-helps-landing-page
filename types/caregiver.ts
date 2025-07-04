// types/caregiver.ts
export interface Caregiver {
  additionalInfo: string;
  availabilityComplete: boolean;
  backgroundCheckConsent: boolean;
  bio: string;
  createdAt: string;
  criminalBackground: boolean;
  currentlyAvailable: string;
  dateOfBirth: string;
  educationLevel: "PRIMARY" | "SECONDARY" | "TERTIARY";
  ethnicity: string;
  expectedMonthlySalary: number;
  experienceLevel: string;
  firstName: string;
  gender: string;
  id: string;
  isBookmarked: boolean;
  isConnected: false;
  isHired: false;
  languagesSpoken: string[];
  lastName: string;
  lgaOfResidence: string;
  literacyLevelDesc: string | null;
  openToLiveIn: true;
  personalDetailsComplete: boolean;
  profileComplete: true;
  profileImageUrl: string;
  rejectionReason: null;
  serviceTypes: string[];
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
