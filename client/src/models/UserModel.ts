export interface UserModel {
  __typename: string;
  UserID: number;
  Username: string;
  Email: string;
  Password: string;
  PhotoUrl: string;
  isChangePassword: number;
}
