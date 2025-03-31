import { Transporter } from "../../interfaces/transporter.interface";
import { TransporterState } from "./TransporterContext";

export const initialState: TransporterState = {
  transporters: [],
  isLoading: false,
  error: null,
};

type TransporterAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Transporter[] }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "CLEAR_ERROR" };

const TransporterReducer = (
  state: TransporterState,
  action: TransporterAction
): TransporterState => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        transporters: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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

export default TransporterReducer;
