export type userStateType = {
  user?: user | null;
  accessToken?: string | null;
};
export type UserContextValues = {
  userState: User;
  setUserState: (userState: User) => void;
  allUsers: any;
  setAllUsers: (allUsers: any) => void;
};
export type UserProps = {
  children: ReactNode;
};
