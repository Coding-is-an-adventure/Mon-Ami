export interface IUser {
  displayName: string;
  userName: string;
  image?: string;
  token: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
