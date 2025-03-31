import { Route } from "../../interfaces/route.interface";
import { RouteState } from "./RouteContext";

export const initialState: RouteState = {
  routes: [],
  isLoading: false,
  error: null,
};

type routeAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Route[] }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "CLEAR_ERROR" };

const RouteReducer = (state: RouteState, action: routeAction): RouteState => {
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
        routes: action.payload,
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

export default RouteReducer;
