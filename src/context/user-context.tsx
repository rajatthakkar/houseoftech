"use client";
import { createContext, ReactElement, useState } from "react";
import { UserContextValues, UserProps, userStateType } from "@/type";

export const UserContext = createContext({} as UserContextValues);

const UserContextProvider = (
  props: UserProps
): ReactElement<UserContextValues> => {
  const [userState, setUserState] = useState<userStateType>(
    {} as userStateType
  );
  const [allUsers, setAllUsers] = useState();

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
        allUsers,
        setAllUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
