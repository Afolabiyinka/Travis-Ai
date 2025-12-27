export interface ChangePasswordPayload {
  id: string;
  newPassword: string;
  oldPassword: string;
}
export interface DeleteAccountPayload {
  id: string;
}
