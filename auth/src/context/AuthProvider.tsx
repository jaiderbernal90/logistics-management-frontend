import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { LoginCredentials, RegisterData, ResponseRegister } from "../interfaces/auth";
import { TOKEN_EXPIRY_KEY, TOKEN_KEY } from "../config/constants";
import { extractErrorMessage } from "../utils/errorHandler";
import * as authService from '../services/authService';
import authReducer, { initialState } from "./authReducer";
import AuthContext from './AuthContext';
import { AuthContextType } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const saveToken = useCallback((token: string, expiryInHours = 24) => {
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + expiryInHours);

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toISOString());
    }, []);

    const checkToken = useCallback(async () => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
            dispatch({ type: 'AUTH_LOGOUT' });
            return;
        }

        try {
            const isValid = await authService.verifyToken();

            if (isValid) {
                dispatch({ type: 'SET_LOADING', payload: false });
            } else {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(TOKEN_EXPIRY_KEY);
                dispatch({ type: 'AUTH_LOGOUT' });
            }
        } catch (error) {
            console.error('Error verificando token:', error);
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(TOKEN_EXPIRY_KEY);
            dispatch({ type: 'AUTH_LOGOUT' });
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        dispatch({ type: 'AUTH_START' });

        try {
            const data = await authService.login(credentials);

            if (!data.token || !data.user) {
                dispatch({
                    type: 'AUTH_FAILURE',
                    payload: data.message || 'Error al iniciar sesión'
                });
                return false;
            }

            saveToken(data.token);

            dispatch({
                type: 'AUTH_SUCCESS',
                payload: data
            });

            window.dispatchEvent(
                new CustomEvent('auth:login:success', {
                    detail: {
                        redirect: '/dashboard',
                        user: data.user
                    }
                })
            );

            return true;
        } catch (error) {
            const errorMessage = extractErrorMessage(error);

            dispatch({
                type: 'AUTH_FAILURE',
                payload: errorMessage
            });

            return false;
        }
    };

    const register = async (userData: RegisterData): Promise<boolean> => {
        dispatch({ type: 'AUTH_START' });

        try {
            const response: ResponseRegister = await authService.register(userData);

            if (response.user) {
                dispatch({ type: 'SET_LOADING', payload: false });
                dispatch({ type: 'CLEAR_ERROR' });

                window.dispatchEvent(
                    new CustomEvent('auth:register:success', {
                        detail: {
                            message: response.message,
                            redirect: '/login'
                        }
                    })
                );
                return true;
            } else {
                dispatch({
                    type: 'AUTH_FAILURE',
                    payload: response.message
                });
                return false;
            }

        } catch (error) {
            const errorMessage = extractErrorMessage(error);

            dispatch({
                type: 'AUTH_FAILURE',
                payload: errorMessage
            });

            return false;
        }
    };

    const logout = useCallback(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            authService.logout();
        }

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        dispatch({ type: 'AUTH_LOGOUT' });

        window.dispatchEvent(new CustomEvent('auth:logout'));

        window.location.href = '/login';
    }, []);

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    useEffect(() => {
        const handleUnauthorized = () => {
            console.log('Sesión expirada o token inválido');
            logout();
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, [logout]);

    const value: AuthContextType = {
        state,
        login,
        register,
        logout,
        clearError
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;