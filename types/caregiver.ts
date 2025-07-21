export type Caregiver = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | string;
  email?: string;
  phone?: string;
  bio: string;
  additionalInfo: string;
  experienceLevel:
    | "LESS_THAN_1_YEAR"
    | "ONE_TO_TWO_YEARS"
    | "THREE_TO_FOUR_YEARS"
    | "FIVE_TO_SEVEN_YEARS"
    | "EIGHT_TO_TEN_YEARS"
    | "OVER_TEN_YEARS"
    | string;
  educationLevel: "PRIMARY" | "SECONDARY" | "TERTIARY" | string;
  ethnicity: string;
  religion: string;
  languagesSpoken: string[];
  serviceTypes: string[];
  subServiceTypes: string[];
  expectedMonthlySalary: number;
  availabilityComplete: boolean;
  currentlyAvailable: "AVAILABLE" | "NOT_AVAILABLE" | string;
  openToLiveIn: boolean;
  criminalBackground: boolean;
  backgroundCheckConsent: boolean;
  safetyScreeningComplete: boolean;
  documentsComplete: boolean;
  workExperienceComplete: boolean;
  personalDetailsComplete: boolean;
  profileComplete: boolean;
  literacyLevelDesc: string | null;
  previousEmployers: any[];
  previousWorkplace: string;
  workExperienceDesc: string;
  relationshipToGuarantor: string;
  rejectionReason: string | null;
  verificationNotes: string | null;
  verifiedAt: string | null;
  isBookmarked: boolean;
  isConnected: boolean;
  isHired: boolean;
  workType: "LIVE_IN" | "LIVE_OUT" | "EITHER" | string;
  profileImageUrl: string;
  userId: string;

  // Location
  location?: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  lgaOfResidence: string;
  workAreas: string[];

  // Metadata
  createdAt: string;
  updatedAt: string;

  // User (nested)
  user: {
    id: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  guarantors: {
    name: string;
    phone: string;
    relationship: string;
  };
  connectionId: string;
  connectedAt: string;
  hiredAt: string;
  sumSubVerifications: any[];
};

export interface SearchCaregiversParams {
  page: number;
  limit: number;
  search?: string;
  serviceTypes?: string[];
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string;
  genders?: string[];
  ethnicities?: string[];
  languages?: string[];
  availability?: string;
  liveInAvailable?: boolean;
  status?: string;
}

export interface CaregiverSearchResult {
  caregivers: Caregiver[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
