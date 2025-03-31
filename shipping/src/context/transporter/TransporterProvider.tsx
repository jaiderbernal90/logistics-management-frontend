import { ReactNode, useReducer } from 'react';
import TransporterContext, { TransporterContextType } from './TransporterContext';
import TransporterReducer, { initialState } from './transporterReducer';
import * as transporterService from '../../services/transporterService';

export const TransporterProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(TransporterReducer, initialState);

    const fetchTransporters = async (): Promise<void> => {
        dispatch({ type: 'FETCH_START' });
        try {
            const { data } = await transporterService.getAllTransporters();
            dispatch({ type: 'FETCH_SUCCESS', payload: data.transporters });
        } catch (error) {
            dispatch({
                type: 'FETCH_FAILURE',
                payload: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    };

    const value: TransporterContextType = {
        state,
        fetchTransporters,
    };

    return (
        <TransporterContext.Provider value={value}>
            {children}
        </TransporterContext.Provider>
    );
};