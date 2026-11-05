export type AuthMode = 'login' | 'signup' | 'forgot' | 'otp' | 'dashboard';

export type Language = 'en' | 'ur';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Administrator' | 'Security Officer';
  avatar?: string;
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  lastLogin: string;
  ipAddress: string;
  device: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
