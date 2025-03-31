import { ApiResponse } from "./api-response.interface";
import { Shipment } from "./shipment.interface";

export interface ReportTransporterPerformance {
  transporters: TransporterReport[];
  overallAvgDeliveryTime: string;
  totalShipments: number;
}

export interface TransporterReport {
  transporterId: number;
  transporterName: string;
  totalShipments: number;
  completedShipments: number;
  avgDeliveryTimeHours: string;
  onTimePercentage: number;
}

export interface ReportTransporterPerformanceResponseApi
  extends ApiResponse<ReportTransporterPerformance> {}

export interface ReportShipmentsResponseApi
  extends ApiResponse<{ items: Shipment[] }> {}
