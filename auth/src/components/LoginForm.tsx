import { useState } from 'react';
import { LoginCredentials } from '../interfaces/auth';
import { useForm } from '../hooks/useForm';
import { Button } from './common/Button';
import { validateEmail, validatePassword } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const navigate = useNavigate();
    const { login, state } = useAuth();
    const { isLoading, error } = state;

    const { values, errors, handleChange, setErrors } = useForm<LoginCredentials>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);

        const newErrors = {
            email: emailError || undefined,
            password: passwordError || undefined
        };

        setErrors(newErrors);

        return !emailError && !passwordError;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        await login(values);
        navigate('/dashboard');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div>
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                        disabled={isLoading}
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                {/* Password field */}
                <div>
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <span className="text-sm text-gray-400">
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </span>
                        </button>
                    </div>
                    {errors.password && <p className="form-error">{errors.password}</p>}
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    className="w-full"
                >
                    Iniciar Sesión
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;