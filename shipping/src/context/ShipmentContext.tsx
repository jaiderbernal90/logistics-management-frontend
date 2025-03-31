import { createContext } from 'react';
import { NewShipmentData, RouteAssignmentData, Shipment, ShipmentState, ShipmentStateCtx } from '../interfaces/shipment.interface';

export interface ShipmentContextType {
  state: ShipmentStateCtx;
  fetchShipments: () => Promise<void>;
  fetchHistoryShipments: (trackingNumber: string) => Promise<void>;
  fetchAllShipments: (state: ShipmentState | null) => Promise<void>;
  fetchAllTransporters: () => Promise<void>;
  fetchAllRoutes: () => Promise<void>;
  createShipment: (data: NewShipmentData) => Promise<boolean>;
  assignRoute: (data: RouteAssignmentData) => Promise<boolean>;
  getShipmentById: (id: number) => Promise<Shipment | null>;
  fetchRoutes: () => Promise<void>;
  fetchTransporters: () => Promise<void>;
  clearError: () => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

export default ShipmentContext;