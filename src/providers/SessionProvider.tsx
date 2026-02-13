import { useAuthDispatchContext } from "@/context/auth-context";
import TKMSDK from "@/utils/TKMSDK";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authDispatch = useAuthDispatchContext();
  const navigate = useNavigate();

  const verifyToken = useCallback(async () => {
    try {
      const sdk = new TKMSDK();
      const response = await sdk.callRawAPI(
        "/api/auth/check",
        "GET",
        undefined,
      );

      authDispatch({
        type: "LOGIN",
        payload: {
          role: response.data.role,
          token: response.data.token,
          user_id: response.data.user_id,
        },
      });
    } catch (error) {
      console.error(error);
      authDispatch({
        type: "LOGOUT",
        payload: { user_id: "", token: "", role: "" },
      });
      navigate("/login");
    }
  }, [authDispatch, navigate]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return children;
}
