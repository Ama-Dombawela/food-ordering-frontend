import { useAuth as useAuthContext } from "../context/AuthContext";

// Thin wrapper so components can import auth helpers from hooks like the spec requests.
export function useAuth() {
  const { authUser, token, login, logout, isAuthenticated, isAdmin, userId } = useAuthContext();

  return {
    user: authUser,
    token,
    userId,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };
}