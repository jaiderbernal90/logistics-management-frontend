import { API_URL } from "../config/constants";
import { RouteApiResponse } from "../interfaces/route.interface";
import { getToken } from "./authService";

export const getAllRoutes = async (): Promise<RouteApiResponse> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/routes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las rutas");
  }

  return response.json();
};
