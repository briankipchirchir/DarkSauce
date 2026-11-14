import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { api, refreshSession, setAccessToken, setAuthLostHandler } from "./api.js";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | in | out
  const started = useRef(false);

  const apply = useCallback((data) => {
    setAccessToken(data.accessToken);
    setUser(data.user);
    setStatus("in");
  }, []);

  const clear = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setStatus("out");
  }, []);

  // On page load: try to resume the session from the refresh cookie.
  useEffect(() => {
    setAuthLostHandler(clear);
    if (started.current) return;
    started.current = true;
    refreshSession().then((data) => (data ? apply(data) : clear()));
  }, [apply, clear]);

  const value = useMemo(() => ({
    user,
    status,
    login: async ({ email, password, remember }) => {
      apply(await api("/api/auth/login", { method: "POST", auth: false, body: { email, password, remember } }));
    },
    register: async ({ email, password, displayName }) => {
      apply(await api("/api/auth/register", { method: "POST", auth: false, body: { email, password, displayName } }));
    },
    logout: async () => {
      try { await api("/api/auth/logout", { method: "POST", auth: false }); } catch { /* sign out locally anyway */ }
      clear();
    },
    updateProfile: async (displayName) => {
      const u = await api("/api/me", { method: "PATCH", body: { displayName } });
      setUser(u);
      return u;
    },
    changePassword: async (currentPassword, newPassword) => {
      apply(await api("/api/me/password", { method: "POST", body: { currentPassword, newPassword } }));
    },
  }), [user, status, apply, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
