import { ReportTransporterPerformance } from "../../interfaces/report.interface";
import { Shipment } from "../../interfaces/shipment.interface";
import { ReportState } from "./ReportContext";

export const initialState: ReportState = {
  reportTransporter: null,
  reportShipments: null,
  isLoading: false,
  error: null,
};

type routeAction =
  | { type: "FETCH_SHIPMENTS_START" }
  | { type: "FETCH_SHIPMENTS_SUCCESS"; payload: { items: Shipment[] } }
  | { type: "FETCH_SHIPMENTS_FAILURE"; payload: string }
  | { type: "FETCH_TRANSPORTER_START" }
  | { type: "FETCH_TRANSPORTER_SUCCESS"; payload: ReportTransporterPerformance }
  | { type: "FETCH_TRANSPORTER_FAILURE"; payload: string }
  | { type: "CLEAR_ERROR" };

const RouteReducer = (state: ReportState, action: routeAction): ReportState => {
  switch (action.type) {
    case "FETCH_SHIPMENTS_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SHIPMENTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "FETCH_SHIPMENTS_SUCCESS":
      return {
        ...state,
        reportShipments: action.payload,
        isLoading: false,
        error: null,
      };

    case "FETCH_TRANSPORTER_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_TRANSPORTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "FETCH_TRANSPORTER_SUCCESS":
      return {
        ...state,
        reportTransporter: action.payload,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default RouteReducer;
