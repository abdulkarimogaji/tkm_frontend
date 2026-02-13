import { createContext, useContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  user_id: string;
  token: string;
  role: string;
  isValidating: boolean;
};

export type ActionType = {
  type: "LOGIN" | "LOGOUT";
  payload: {
    user_id: string;
    token: string;
    role: string;
  };
};

export const initialState: AuthContextType = {
  isAuthenticated: false,
  user_id: "",
  token: "",
  role: "",
  isValidating: false,
};

export const AuthContext = createContext<AuthContextType>(initialState);

export const AuthDispatchContext = createContext<React.Dispatch<ActionType>>(
  () => {},
);

export const useAuthContext = () => useContext(AuthContext);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);
