// src/types/careseeker.ts
export interface User {
  id: string;
  email: string;
  phone: string | null;
  role: "CARESEEKER" | "CAREGIVER";
  status: "ACTIVE" | "INACTIVE";
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerifyToken: string | null;
  phoneVerifyToken: string | null;
  resetPasswordToken: string | null;
  refreshToken: string | null;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  lastStep: number;
}

export interface CareseekerProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  onboardingComplete: boolean;
  preferredLocations: string[];
  budgetMin: number | null;
  budgetMax: number | null;
  preferredServiceTypes: string[];
  additionalPreferences: any | null;
  profileImageUrl: string | null;
  newCaregiverMatchesNotifications: boolean;
  subscriptionRemindersNotifications: boolean;
  systemAnnouncementsNotifications: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  data: T;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}
