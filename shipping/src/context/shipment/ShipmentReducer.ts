import {
  ShipmentAction,
  ShipmentStateCtx,
} from "../../interfaces/shipment.interface";

export const initialState: ShipmentStateCtx = {
  shipments: [],
  shipmentsAdmin: [],
  selectedShipment: null,
  shipmentHistory: null,
  isLoading: false,
  error: null,
};

export const shipmentReducer = (
  state: ShipmentStateCtx,
  action: ShipmentAction
): ShipmentStateCtx => {
  switch (action.type) {
    case "FETCH_SHIPMENTS_SUCCESS":
      return {
        ...state,
        shipments: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_ALL_SHIPMENTS_SUCCESS":
      return {
        ...state,
        shipmentsAdmin: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_HISTORY_SHIPMENTS_SUCCESS":
      return {
        ...state,
        shipmentHistory: action.payload,
        isLoading: false,
        error: null,
      };
    case "CREATE_SHIPMENT_SUCCESS":
      return {
        ...state,
        shipments: [...state.shipments, action.payload],
        selectedShipment: action.payload,
        isLoading: false,
        error: null,
      };
    case "CREATE_SHIPMENT_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ASSIGN_ROUTE_START":
      return { ...state, isLoading: true, error: null };
    case "ASSIGN_ROUTE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "SELECT_SHIPMENT":
      return {
        ...state,
        selectedShipment: action.payload,
      };

    case "ASSIGN_ROUTE_SUCCESS":
      return {
        ...state,
        shipments: state.shipments.map((shipment) =>
          shipment.id === action.payload.id ? action.payload : shipment
        ),
        selectedShipment: action.payload,
        isLoading: false,
        error: null,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};
