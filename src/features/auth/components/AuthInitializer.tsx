import { useEffect } from "react";

import { useMe } from "../hooks/useMe";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthInitializer() {
  const { data, isSuccess } = useMe();

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess, setUser]);

  return null;
}