import { createContext, useContext, useReducer } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user_id: number;
  token: string;
  role: string;
  isValidating: boolean;
};
type ActionType = {
  type: "LOGIN" | "LOGOUT";
  payload: {
    user_id: number;
    token: string;
    role: string;
  };
};
const initialState = {
  isAuthenticated: false,
  user_id: 0,
  token: "",
  role: "",
  isValidating: false,
};

export const AuthContext = createContext<AuthContextType>(initialState);
export const AuthDispatchContext = createContext<React.Dispatch<ActionType>>(() => {});

const reducer = (state: AuthContextType, action: ActionType) => {
  console.log("dispatching login");
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user_id", String(action.payload.user_id));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        user_id: action.payload.user_id,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user_id: 0,
        isValidating: false,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);

export default AuthProvider;
