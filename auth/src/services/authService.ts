import {
  LoginCredentials,
  RegisterData,
  ResponseLogin,
  ResponseRegister,
} from "../interfaces/auth";
import { API_URL } from "../config/constants";

export const login = async (
  credentials: LoginCredentials
): Promise<ResponseLogin> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return await response.json();
};

export const register = async (
  userData: RegisterData
): Promise<ResponseRegister> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  return data;
};

export const verifyToken = async (): Promise<boolean> => {
  const token = localStorage.getItem("auth_token");
  if (!token) return false;
  return true;
};

export const logout = async (): Promise<void> => {
  const token = localStorage.getItem("auth_token");
  if (!token) return;

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const isAdmin = (): boolean => {
  return false;
};
