import { api } from "../api/api";

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
interface FeedbackPayload {
  hired: boolean;
  hireDate?: string;
  rating?: number;
  comments: string;
  reasonsNotHired?: string[];
}

export const careseekersService = {
  /**
   * Get care seeker profile
   */
  getProfile: async () => {
    return api.get("/careseekers/profile");
  },

  /**
   * Update care seeker profile
   */
  updateProfile: async (profileData: ProfileData) => {
    return api.put("/careseekers/profile", profileData);
  },

  /**
   * Change password
   */
  changePassword: async (payload: ChangePasswordPayload) => {
    return api.post("/careseekers/change-password", payload);
  },

  /**
   * Delete care seeker account
   */
  deleteAccount: async () => {
    return api.delete("/careseekers");
  },

  /**
   * Upload profile picture
   */
  uploadProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    return api.put("/careseekers/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteProfilePicture: async () => {
    return api.delete("/careseekers/profile/photo");
  },
  getConnectedCaregivers: async () => {
    return api.get("/connections/connected");
  },
  connectWithCaregiver: async (caregiverId: string) => {
    return api.post(`/connections/${caregiverId}`);
  },
  sendFeedback: async (payload: FeedbackPayload, connectId: string) => {
    return api.post(`/connections/${connectId}/feedback`, payload);
  },
  getCaregiverFeedback: async (connectId: string) => {
    return api.get(`/connections/${connectId}/feedback`);
  },
};
