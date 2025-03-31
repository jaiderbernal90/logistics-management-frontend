import { createContext } from 'react';
import { AuthState, LoginCredentials, RegisterData } from '../interfaces/auth';

export interface AuthContextType {
    state: AuthState;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;