import { API_URL } from "../config/constants";
import { Route, Transporter } from "../interfaces/shipment.interface";
import { getToken } from "./authService";

export const getRoutes = async (): Promise<Route[]> => {
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

export const getRouteById = async (id: number): Promise<Route> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener la ruta");
  }

  return response.json();
};

export const getTransporters = async (): Promise<Transporter[]> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/transporters`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los transportistas");
  }

  return response.json();
};

export const getAvailableTransporters = async (): Promise<Transporter[]> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/transporters/available`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los transportistas disponibles");
  }

  return response.json();
};

export const checkTransporterAvailability = async (
  transporterId: number
): Promise<boolean> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/transporters/${transporterId}/availability`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.available;
};