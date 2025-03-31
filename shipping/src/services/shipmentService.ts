import { API_URL } from "../config/constants";
import { NewShipmentData, RouteApiResponse, RouteAssignmentData, Shipment, ShipmentsApiResponse, ShipmentHistoryApiResponse, ShipmentState, TransporterApiResponse, ShipmentApiResponse } from "../interfaces/shipment.interface";
import { getToken } from "./authService";


export const getShipments = async (): Promise<ShipmentsApiResponse> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments/my-shipments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los envíos");
  }

  return response.json();
};

export const getAllShipments = async (state: ShipmentState | null): Promise<ShipmentsApiResponse> => {
  const token = getToken();
  const query = state ? `?state=${state}` : '';
  const response = await fetch(`${API_URL}/shipments/all${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los envíos");
  }

  return response.json();
};

export const getAllTransporters = async (): Promise<TransporterApiResponse> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments/transporters`, {
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

export const getAllRoutes = async (): Promise<RouteApiResponse> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments/routes`, {
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

export const getShipmentById = async (id: number): Promise<ShipmentApiResponse> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el envío");
  }

  return response.json();
};

export const createShipment = async (
  data: NewShipmentData
): Promise<Shipment> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...data,
      state: ShipmentState.EN_ESPERA,
      date: new Date(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el envío");
  }

  return response.json();
};

export const assignRoute = async (
  data: RouteAssignmentData
): Promise<Shipment> => {
  const token = getToken();
  const response = await fetch(
    `${API_URL}/shipments/assign`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        route_id: data.route_id,
        transporter_id: data.transporter_id,
        shipment_id: data.shipment_id
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al asignar la ruta");
  }

  return response.json();
};

export const updateShipmentStatus = async (
  id: number,
  status: ShipmentState
): Promise<Shipment> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al actualizar el estado del envío"
    );
  }

  return response.json();
};

export const getHistoryShipments = async (tracking_number: string): Promise<ShipmentHistoryApiResponse> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/shipments/track/${tracking_number}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los envíos");
  }

  return response.json();
};