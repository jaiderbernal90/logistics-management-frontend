import { ReactNode, useCallback, useReducer } from "react";
import ShipmentContext, { ShipmentContextType } from "./ShipmentContext";
import shipmentReducer, { initialState } from "./ShipmentReducer";
import { extractErrorMessage } from "../utils/errorHandler";
import { NewShipmentData, RouteAssignmentData, Shipment, ShipmentState } from "../interfaces/shipment.interface";
import * as shipmentService from "../services/shipmentService";
import * as routeService from "../services/routeService";

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(shipmentReducer, initialState);

    const fetchShipments = async (): Promise<void> => {
        dispatch({ type: "FETCH_SHIPMENTS_START" });

        try {
            const { data } = await shipmentService.getShipments();

            dispatch({
                type: "FETCH_SHIPMENTS_SUCCESS",
                payload: data.shipments,
            });
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "FETCH_SHIPMENTS_FAILURE",
                payload: errorMessage,
            });
        }
    };

    const fetchAllShipments = async (state: ShipmentState | null): Promise<void> => {
        dispatch({ type: "FETCH_ALL_SHIPMENTS_START" });

        try {
            const { data } = await shipmentService.getAllShipments(state);

            dispatch({
                type: "FETCH_ALL_SHIPMENTS_SUCCESS",
                payload: data.shipments,
            });
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "FETCH_ALL_SHIPMENTS_FAILURE",
                payload: errorMessage,
            });
        }
    };

    const fetchAllTransporters = async (): Promise<void> => {
        dispatch({ type: "FETCH_TRANSPORTERS_START" });

        try {
            const { data } = await shipmentService.getAllTransporters();
            dispatch({
                type: "FETCH_TRANSPORTERS_SUCCESS",
                payload: data.transporters,
            });
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "FETCH_TRANSPORTERS_FAILURE",
                payload: errorMessage,
            });
        }
    };

    const fetchAllRoutes = async (): Promise<void> => {
        dispatch({ type: "FETCH_ROUTES_START" });

        try {
            const { data } = await shipmentService.getAllRoutes();
            dispatch({
                type: "FETCH_ROUTES_SUCCESS",
                payload: data.routes,
            });
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "FETCH_ROUTES_FAILURE",
                payload: errorMessage,
            });
        }
    };

    const fetchHistoryShipments = async (trackingNumber: string): Promise<void> => {
        dispatch({ type: "FETCH_HISTORY_SHIPMENTS_START" });

        try {
            const historyShipments = await shipmentService.getHistoryShipments(trackingNumber);
            dispatch({
                type: "FETCH_HISTORY_SHIPMENTS_SUCCESS",
                payload: historyShipments.data,
            });
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "FETCH_HISTORY_SHIPMENTS_FAILURE",
                payload: errorMessage,
            });
        }
    };

    const createShipment = async (data: NewShipmentData): Promise<boolean> => {
        dispatch({ type: "CREATE_SHIPMENT_START" });

        try {
            const newShipment = await shipmentService.createShipment(data);
            dispatch({
                type: "CREATE_SHIPMENT_SUCCESS",
                payload: newShipment,
            });
            return true;
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "CREATE_SHIPMENT_FAILURE",
                payload: errorMessage,
            });
            return false;
        }
    };

    const getShipmentById = async (id: number): Promise<Shipment | null> => {
        try {
            const res = await shipmentService.getShipmentById(id);
            dispatch({
                type: "SELECT_SHIPMENT",
                payload: res.data.shipment,
            });
            return res.data.shipment;
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "FETCH_SHIPMENTS_FAILURE",
                payload: errorMessage,
            });
            return null;
        }
    };

    const assignRoute = async (data: RouteAssignmentData): Promise<boolean> => {
        dispatch({ type: "ASSIGN_ROUTE_START" });

        try {
            const updatedShipment = await shipmentService.assignRoute(data);
            dispatch({
                type: "ASSIGN_ROUTE_SUCCESS",
                payload: updatedShipment,
            });
            return true;
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            dispatch({
                type: "ASSIGN_ROUTE_FAILURE",
                payload: errorMessage,
            });
            return false;
        }
    };

    const fetchRoutes = async (): Promise<void> => {
        try {
            const routes = await routeService.getRoutes();
            dispatch({
                type: "FETCH_ROUTES_SUCCESS",
                payload: routes,
            });
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    const fetchTransporters = async (): Promise<void> => {
        try {
            const transporters = await routeService.getTransporters();
            dispatch({
                type: "FETCH_TRANSPORTERS_SUCCESS",
                payload: transporters,
            });
        } catch (error) {
            console.error("Error fetching transporters:", error);
        }
    };

    const clearError = useCallback(() => {
        dispatch({ type: "CLEAR_ERROR" });
    }, []);

    const value: ShipmentContextType = {
        state,
        fetchShipments,
        createShipment,
        assignRoute,
        getShipmentById,
        fetchRoutes,
        fetchTransporters,
        clearError,
        fetchHistoryShipments,
        fetchAllShipments,
        fetchAllTransporters,
        fetchAllRoutes
    };

    return <ShipmentContext.Provider value={value}>{children}</ShipmentContext.Provider>;
};

export default ShipmentProvider;