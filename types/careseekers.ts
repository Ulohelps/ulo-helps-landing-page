export interface User {
  id: string;
  email: string;
  phone: string;
  password: string;
  status: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  careseeekerId: string;
  plan: string;
  status: string;
  amount: number;
  currency: string;
  paystackReference: string;
  paystackCustomerId: string | null;
  paymentMethod: string | null;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  connectionsUsed: number;
  maxConnections: number | null;
  createdAt: string;
  updatedAt: string;
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
  additionalPreferences: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  newCaregiverMatchesNotifications: boolean;
  subscriptionRemindersNotifications: boolean;
  systemAnnouncementsNotifications: boolean;
  user: User;
  subscription: Subscription;
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

export interface ConnectionedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  profileImageUrl: string;
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
