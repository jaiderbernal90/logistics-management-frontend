import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuthStatus } from '../hooks/useAuthStatus';

const LoginPage = () => {
    const { isAuthenticated } = useAuthStatus();

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Usuario autenticado');

            window.dispatchEvent(
                new CustomEvent('auth:login:success', {
                    detail: { redirect: '/dashboard' }
                })
            );
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">Coordinadora Logística</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sistema de gestión de envíos y rutas
                    </p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;