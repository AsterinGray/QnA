export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  accessToken: string;
  expiresIn: string;
}
