import { createContext } from 'react';
import { Shipment, ShipmentState } from '../../interfaces/shipment.interface';
import { ReportTransporterPerformance } from '../../interfaces/report.interface';

export interface ReportState {
    reportShipments: { items: Shipment[] } | null;
    reportTransporter: ReportTransporterPerformance | null;
    isLoading: boolean;
    error: string | null;
}

export interface ReportContextType {
    state: ReportState;
    fetchReportShipments: (startDate: string, endDate: string, transporterId?: number, state?: ShipmentState) => Promise<void>;
    fetchReportTransporter: (startDate: string, endDate: string) => Promise<void>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export default ReportContext;