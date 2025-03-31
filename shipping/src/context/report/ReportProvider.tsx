import { ReactNode, useReducer } from 'react';
import * as reportService from '../../services/reportService';
import RouteReducer, { initialState } from './reportReducer';
import ReportContext, { ReportContextType } from './ReportContext';
import { ShipmentState } from '../../interfaces/shipment.interface';

export const ReportProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(RouteReducer, initialState);


    const fetchReportShipments = async (startDate: string, endDate: string, transporterId?: number, state?: ShipmentState): Promise<void> => {
        dispatch({ type: 'FETCH_SHIPMENTS_START' });
        try {

            let query = `?startDate=${startDate}&endDate=${endDate}`;

            if (transporterId) query += `&transporterId=${transporterId}`;
            if (state) query += `&state=${state}`;

            const { data } = await reportService.getReportShipments(query);
            dispatch({ type: 'FETCH_SHIPMENTS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'FETCH_SHIPMENTS_FAILURE',
                payload: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    };

    const fetchReportTransporter = async (startDate: string, endDate: string): Promise<void> => {
        dispatch({ type: 'FETCH_TRANSPORTER_START' });
        try {
            const { data } = await reportService.getReportTransporter(startDate, endDate);
            dispatch({ type: 'FETCH_TRANSPORTER_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'FETCH_TRANSPORTER_FAILURE',
                payload: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    };

    const value: ReportContextType = {
        state,
        fetchReportShipments,
        fetchReportTransporter
    };

    return (
        <ReportContext.Provider value={value}>
            {children}
        </ReportContext.Provider>
    );
};