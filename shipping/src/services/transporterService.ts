import { API_URL } from "../config/constants";
import { TransporterApiResponse } from "../interfaces/transporter.interface";
import { getToken } from "./authService";

export const getAllTransporters = async (): Promise<TransporterApiResponse> => {
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