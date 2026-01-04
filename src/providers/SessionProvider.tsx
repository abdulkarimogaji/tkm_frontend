import { useAuthDispatchContext } from "@/context/auth";
import TKMSDK from "@/utils/TKMSDK";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authDispatch = useAuthDispatchContext();
  const navigate = useNavigate();

  async function verifyToken() {
    try {
      const sdk = new TKMSDK();
      const response = await sdk.callRawAPI(
        "/api/auth/check",
        "GET",
        undefined
      );
      authDispatch({
        type: "LOGIN",
        payload: {
          role: response.data.role,
          token: response.data.token,
          user_id: response.data.user_id,
        },
      });
    } catch {
      authDispatch({
        type: "LOGOUT",
        payload: { user_id: 0, token: "", role: "" },
      });
      navigate("/login");
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return children;
}
