import { createContext } from 'react';
import { Transporter } from '../../interfaces/transporter.interface';

export interface TransporterState {
    transporters: Transporter[];
    isLoading: boolean;
    error: string | null;
}

export interface TransporterContextType {
    state: TransporterState;
    fetchTransporters: () => Promise<void>;
}

const TransporterContext = createContext<TransporterContextType | undefined>(undefined);

export default TransporterContext;