import { create } from "zustand";
import { useAuthStore } from "./auth-store";

interface RegistrationStatus {
  personalDetailsComplete: boolean;
  workExperienceComplete: boolean;
  documentsComplete: boolean;
  safetyScreeningComplete: boolean;
  availabilityComplete: boolean;
  profileComplete: boolean;
  status: string;
  nextStep: string;
  documentsUploaded: number;
  requiredDocuments: string[];
  optionalDocuments: string[];
}

interface CaregiverProfile {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  stateOfOrigin?: string;
  stateOfResidence?: string;
  lgaOfResidence?: string;
  languagesSpoken?: string;
  serviceTypes?: string[];
  experienceLevel?: string;
  educationLevel?: string;
  openToJobTypes?: string[];
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  workExperienceDesc?: string;
  previousWorkplace?: string;
  guarantorName?: string;
  guarantorPhone?: string;
  relationshipToGuarantor?: string;
  criminalBackground?: boolean;
  backgroundCheckConsent?: boolean;
  workType?: string;
  openToLiveIn?: boolean;
  workAreas?: string;
  currentlyAvailable?: string;
  additionalInfo?: string;
  agreementAccepted?: boolean;
  status?: string;
  profileComplete?: boolean;
  documents?: any[];
  documentCapturVerifications?: DocumentCaptureVerificationType;
}

interface DocumentCaptureVerificationType {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  caregiverId: string;
  nameCheck: boolean;
  expired: boolean;
  dobCheck: boolean;
  genderCheck: boolean;
  attemptedCheck: boolean;
  expiryDate: string | null;
  metaData: CareGiversCapturedDocumentFormDataType | null;
}

interface CaregiverState {
  profile: CaregiverProfile | null;
  registrationStatus: RegistrationStatus | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProfile: () => Promise<void>;
  fetchRegistrationStatus: () => Promise<void>;
  updatePersonalDetails: (data: any) => Promise<void>;
  updateWorkExperience: (data: any) => Promise<void>;
  updateDocumentsReferences: (data: any) => Promise<void>;
  updateSafetyScreening: (data: any) => Promise<void>;
  updateAvailability: (data: any) => Promise<void>;
  uploadDocument: (
    file: File,
    documentType: string,
    description?: string
  ) => Promise<any>;
  deleteDocument: (documentId: string) => Promise<void>;
  verifyCaregivers: (formData: {
    documentType: string;
    documentImage: string;
    selfieImage: string;
  }) => Promise<void>;
  verifyCaregiversCapturedDocument: (
    formData: CareGiversCapturedDocumentFormDataType
  ) => Promise<any>;
  initiateVerification: () => Promise<void>;
}

interface CareGiversCapturedDocumentFormDataType {
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  dateOfExpiry: string;
  gender: string;
  issuingCountry: any;
}

const API_BASE_URL =
  "https://ulo-v1-stagging-be-b9a3d3832785.herokuapp.com/api/v1";
// "http://localhost:3200/api/v1";
// "https://ulo-v1-stagging-be-b9a3d3832785.herokuapp.com/api/v1";

const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
) => {
  const { accessToken, refreshAccessToken } = useAuthStore.getState();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  console.log(accessToken);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // Try to refresh token
    try {
      await refreshAccessToken();
      const newAccessToken = useAuthStore.getState().accessToken;

      // Retry request with new token
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } catch (error) {
      // Refresh failed, redirect to login
      useAuthStore.getState().logout();
      throw new Error("Session expired");
    }
  }

  return response;
};

export const useCaregiverStore = create<CaregiverState>((set, get) => ({
  profile: null,
  registrationStatus: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/profile`
      );
      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      set({ profile: data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchRegistrationStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/registration/status`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch registration status");
      }

      set({ registrationStatus: data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updatePersonalDetails: async (formData: any) => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/registration/personal-details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(response)

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update personal details");
      }

      set({ profile: data.data, isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateWorkExperience: async (formData: any) => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/registration/work-experience`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update work experience");
      }

      set({ profile: data.data, isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateDocumentsReferences: async (formData: any) => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/registration/documents-references`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update documents and references"
        );
      }

      set({ profile: data.data, isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateSafetyScreening: async (formData: any) => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/registration/safety-screening`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update safety screening");
      }

      set({ profile: data.data, isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateAvailability: async (formData: any) => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/registration/availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update availability");
      }

      set({ profile: data.data, isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  uploadDocument: async (
    file: File,
    documentType: string,
    description?: string
  ) => {
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);
      if (description) {
        formData.append("description", description);
      }

      const { accessToken } = useAuthStore.getState();

      const response = await fetch(
        `${API_BASE_URL}/caregivers/documents/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload document");
      }

      set({ isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();

      return data.data;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteDocument: async (documentId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/documents/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete document");
      }

      set({ isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  verifyCaregiversCapturedDocument: async (formData: {
    documentType: string;
    documentNumber: string;
    firstName: string;
    lastName: string;
    fullName: string;
    dateOfBirth: string;
    dateOfExpiry: string;
    gender: string;
    issuingCountry: any;
  }) => {
    set({ isLoading: true, error: null });

    console.log(formData);

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/verification/complete-verification/document-capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify caregiver");
      }

      set({ isLoading: false });

      // Refresh registration status
      // await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  verifyCaregivers: async (formData: {
    documentType: string;
    documentImage: string;
    selfieImage: string;
    firstName?: string;
    lastName?: string;
  }) => {
    set({ isLoading: true, error: null });

    console.log(formData);

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/verification/complete-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify caregiver");
      }

      set({ isLoading: false });

      // Refresh registration status
      // await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  initiateVerification: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await makeAuthenticatedRequest(
        `${API_BASE_URL}/caregivers/verification/initiate`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate verification");
      }

      set({ isLoading: false });

      // Refresh registration status
      await get().fetchRegistrationStatus();
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
