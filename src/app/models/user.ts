export interface User {
  displayName?: string;
  email: string;
  lastTimeConnected: string;
  liked: boolean;
  phoneNumber?: string;
  photoURL?: string;
  providerId?: string;
  uid: string;
  userType: string;
}
