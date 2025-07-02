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
};
