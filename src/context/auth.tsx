import { useReducer } from "react";
import {
  AuthContext,
  AuthDispatchContext,
  type AuthContextType,
  type ActionType,
  initialState,
} from "./auth-context";

const reducer = (state: AuthContextType, action: ActionType) => {
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
        user_id: "",
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
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
