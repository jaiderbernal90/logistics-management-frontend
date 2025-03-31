import { createContext } from 'react';
import { NewShipmentData, Shipment, ShipmentState, ShipmentStateCtx } from '../../interfaces/shipment.interface';
import { RouteAssignmentData } from '../../interfaces/route.interface';


export interface ShipmentContextType {
  state: ShipmentStateCtx;
  fetchShipments: () => Promise<void>;
  fetchHistoryShipments: (trackingNumber: string) => Promise<void>;
  fetchAllShipments: (state: ShipmentState | null) => Promise<void>;
  createShipment: (data: NewShipmentData) => Promise<boolean>;
  assignRoute: (data: RouteAssignmentData) => Promise<boolean>;
  getShipmentById: (id: number) => Promise<Shipment | null>;
  clearError: () => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

export default ShipmentContext;