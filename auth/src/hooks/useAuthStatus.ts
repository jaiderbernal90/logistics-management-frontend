import { useAuth } from "./useAuth";

export const useAuthStatus = () => {
  const { state } = useAuth();
  return {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user,
    error: state.error,
  };
};
