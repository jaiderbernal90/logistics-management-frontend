import { ApiResponse } from "./api-response.interface";
import { Package } from "./package.interface";

export enum ShipmentState {
  EN_ESPERA = "En espera",
  EN_TRANSITO = "En tránsito",
  ENTREGADO = "Entregado",
}

export interface Shipment {
  id?: number;
  user_id: number;
  transporter_id?: number;
  route_id?: number;
  tracking_number?: string;
  state: ShipmentState;
  date: Date;
  delivery_date?: Date;
  origin_address: string;
  destination_address: string;
  created_at?: Date;
  updated_at?: Date;
  package?: Package;
}

export interface ShipmentHistory {
  shipment: Shipment;
  package: Package;
  status_history: {
    id?: number;
    shipment_id?: number;
    status: string;
    location: string;
    created_at: string;
  }[];
}
export interface NewShipmentData {
  origin_address: string;
  destination_address: string;
  package: {
    weight: number;
    size: string;
    type_of_product: string;
    description: string;
    value: number;
  };
}

export interface ShipmentStateCtx {
  shipments: Shipment[];
  shipmentsAdmin: Shipment[];
  shipmentHistory: ShipmentHistory | null;
  selectedShipment: Shipment | null;
  isLoading: boolean;
  error: string | null;
}

export type ShipmentAction =
  | { type: "FETCH_SHIPMENTS_START" }
  | { type: "FETCH_SHIPMENTS_SUCCESS"; payload: Shipment[] }
  | { type: "FETCH_SHIPMENTS_FAILURE"; payload: string }
  | { type: "FETCH_ALL_SHIPMENTS_SUCCESS"; payload: Shipment[] }
  | { type: "FETCH_ALL_SHIPMENTS_START" }
  | { type: "FETCH_ALL_SHIPMENTS_FAILURE"; payload: string }
  | {
      type: "FETCH_HISTORY_SHIPMENTS_SUCCESS";
      payload: ShipmentHistory;
    }
  | { type: "FETCH_HISTORY_SHIPMENTS_START" }
  | { type: "FETCH_HISTORY_SHIPMENTS_FAILURE"; payload: string }
  | { type: "CREATE_SHIPMENT_START" }
  | { type: "CREATE_SHIPMENT_SUCCESS"; payload: Shipment }
  | { type: "CREATE_SHIPMENT_FAILURE"; payload: string }
  | { type: "SELECT_SHIPMENT"; payload: Shipment | null }
  | { type: "ASSIGN_ROUTE_START" }
  | { type: "ASSIGN_ROUTE_SUCCESS"; payload: Shipment }
  | { type: "ASSIGN_ROUTE_FAILURE"; payload: string }
  | { type: "CLEAR_ERROR" };

export interface ShipmentsApiResponse
  extends ApiResponse<{ shipments: Shipment[] }> {}

export interface ShipmentApiResponse
  extends ApiResponse<{ shipment: Shipment }> {}

export interface ShipmentHistoryApiResponse
  extends ApiResponse<ShipmentHistory> {}
