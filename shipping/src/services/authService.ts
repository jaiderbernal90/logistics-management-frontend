import { TOKEN_KEY } from "../config/constants";
import { decodeToken } from "../utils/token";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

export const getUserRole = (): string | null => {
  const userString = localStorage.getItem(TOKEN_KEY);
  if (!userString) return null;

  try {
    const user = decodeToken(userString);
    return user.role;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

export const isAdmin = (): boolean => {
  return getUserRole() === "ADMIN";
};
