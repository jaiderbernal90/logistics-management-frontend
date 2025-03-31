import { API_URL } from "../config/constants";
import { ReportShipmentsResponseApi, ReportTransporterPerformanceResponseApi } from "../interfaces/report.interface";
import { getToken } from "./authService";

export const getReportTransporter = async (
  starDate: string,
  endDate: string
): Promise<ReportTransporterPerformanceResponseApi> => {
  const token = getToken();
  const response = await fetch(
    `${API_URL}/reports/transporters/performance?startDate=${starDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las rutas");
  }

  return response.json();
};


export const getReportShipments = async (
  query: string
): Promise<ReportShipmentsResponseApi> => {
  const token = getToken();
  const response = await fetch(
    `${API_URL}/reports/shipments/detailed${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las rutas");
  }

  return response.json();
};
