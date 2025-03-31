import { ReactNode, useReducer } from 'react';
import * as routeService from '../../services/routeService';
import RouteReducer, { initialState } from './routeReducer';
import RouteContext, { RouteContextType } from './RouteContext';

export const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(RouteReducer, initialState);

    const fetchRoutes = async (): Promise<void> => {
        dispatch({ type: 'FETCH_START' });
        try {
            const { data } = await routeService.getAllRoutes();
            dispatch({ type: 'FETCH_SUCCESS', payload: data.routes });
        } catch (error) {
            dispatch({
                type: 'FETCH_FAILURE',
                payload: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    };

    const value: RouteContextType = {
        state,
        fetchRoutes,
    };

    return (
        <RouteContext.Provider value={value}>
            {children}
        </RouteContext.Provider>
    );
};