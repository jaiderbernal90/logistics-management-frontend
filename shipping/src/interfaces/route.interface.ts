import { ApiResponse } from "./api-response.interface";

export interface Route {
  id: number;
  name: string;
  origin: string;
  destination: string;
}

export interface RouteAssignmentData {
  shipment_id: number;
  route_id: number;
  transporter_id: number;
}

export interface RouteApiResponse extends ApiResponse<{ routes: Route[] }> {}

export interface RouteAssignmentProps {
  shipmentId: number;
}
