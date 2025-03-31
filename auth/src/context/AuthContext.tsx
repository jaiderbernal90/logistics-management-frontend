import { createContext } from 'react';
import { AuthState, LoginCredentials, RegisterData } from '../interfaces/auth';

// Definir el tipo para el contexto de autenticación
export interface AuthContextType {
    state: AuthState;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
}

// Crear el contexto con un valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;