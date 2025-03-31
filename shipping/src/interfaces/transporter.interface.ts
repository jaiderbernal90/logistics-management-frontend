import { ApiResponse } from "./api-response.interface";

export interface Transporter {
  id: number;
  name: string;
  vehicle_type: string;
  capacity: number;
  available: boolean;
  plate?: string;
}

export interface TransporterApiResponse
  extends ApiResponse<{ transporters: Transporter[] }> {}
