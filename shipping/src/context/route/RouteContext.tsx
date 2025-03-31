import { createContext } from 'react';
import { Route } from '../../interfaces/route.interface';

export interface RouteState {
    routes: Route[];
    isLoading: boolean;
    error: string | null;
}

export interface RouteContextType {
    state: RouteState;
    fetchRoutes: () => Promise<void>;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export default RouteContext;