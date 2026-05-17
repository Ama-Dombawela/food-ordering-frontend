import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthUser } from "../types";

interface AuthContextType {
  authUser: AuthUser | null;
  token: string | null;
  userId: number | null;
  login: (token: string, authUser: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  try {
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function extractUserId(token: string): number | null {
  const payload = decodeJwtPayload(token);

  if (!payload) {
    return null;
  }

  const candidates = [payload.userId, payload.user_id, payload.id, payload.sub];

  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return candidate;
    }

    if (typeof candidate === "string" && /^\d+$/.test(candidate)) {
      return Number(candidate);
    }
  }

  return null;
}

function readStoredAuthUser(): AuthUser | null {
  const storedAuthUser = localStorage.getItem("authUser");

  if (!storedAuthUser) {
    return null;
  }

  try {
    return JSON.parse(storedAuthUser) as AuthUser;
  } catch {
    localStorage.removeItem("authUser");
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedToken = localStorage.getItem("token");
      const storedAuthUser = readStoredAuthUser();
      const storedUserIdValue = localStorage.getItem("userId");

      if (storedToken && storedAuthUser) {
        setToken(storedToken);
        setAuthUser(storedAuthUser);

        if (storedUserIdValue) {
          const parsedUserId = Number(storedUserIdValue);

          if (Number.isFinite(parsedUserId)) {
            setUserId(parsedUserId);
            return;
          }
        }

        const derivedUserId = extractUserId(storedToken);
        setUserId(derivedUserId);

        if (derivedUserId !== null) {
          localStorage.setItem("userId", String(derivedUserId));
        }
      }
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const login = (tokenValue: string, authUserValue: AuthUser) => {
    const derivedUserId = extractUserId(tokenValue);

    setToken(tokenValue);
    setAuthUser(authUserValue);
    setUserId(derivedUserId);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("authUser", JSON.stringify(authUserValue));

    if (derivedUserId !== null) {
      localStorage.setItem("userId", String(derivedUserId));
    } else {
      localStorage.removeItem("userId");
    }
  };

  const logout = () => {
    setAuthUser(null);
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    localStorage.removeItem("userId");
  };

  const value = useMemo(
    () => ({
      authUser,
      token,
      userId,
      login,
      logout,
      isAuthenticated: token !== null,
      isAdmin: authUser?.role === "ADMIN",
    }),
    [authUser, token, userId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
