import { useState, FormEvent, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { RegisterData } from '../interfaces/auth';
import { validateEmail, validateMatchingPasswords, validatePassword } from '../utils/validators';

const RegisterForm = () => {
  const { register, state } = useAuth();
  const { error, isLoading } = state;

  const [userData, setUserData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const validateForm = useCallback((): boolean => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!userData.name.trim()) {
      errors.name = 'El nombre es requerido';
      isValid = false;
    }

    const emailError = validateEmail(userData.email);
    if (emailError) {
      errors.email = emailError;
      isValid = false;
    }

    const passwordError = validatePassword(userData.password);
    if (passwordError) {
      errors.password = passwordError;
      isValid = false;
    }

    if (!userData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
      isValid = false;
    } else {
      const passwordsMatchError = validateMatchingPasswords(
        userData.password,
        userData.confirmPassword
      );

      if (passwordsMatchError) {
        errors.confirmPassword = passwordsMatchError;
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  }, [userData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [formErrors]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await register(userData);
    if (success) {
      setRegistrationComplete(true);
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  if (registrationComplete) {
    return (
      <div className="bg-green-50 rounded-lg shadow-md p-8 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">¡Registro Exitoso!</h2>
        <p className="text-center mb-4">
          Tu cuenta ha sido creada correctamente. Ahora puedes acceder al sistema.
        </p>
        <div className="flex justify-center">
          <a
            href="/login"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-colors"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de nombre */}
        <div>
          <label htmlFor="name" className="form-label">
            Nombre Completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={userData.name}
            onChange={handleChange}
            className={`form-input ${formErrors.name ? 'border-red-300' : 'border-gray-300'}`}
            disabled={isLoading}
            placeholder="Ingresa tu nombre completo"
          />
          {formErrors.name && <p className="form-error">{formErrors.name}</p>}
        </div>

        {/* Campo de correo electrónico */}
        <div>
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
            className={`form-input ${formErrors.email ? 'border-red-300' : 'border-gray-300'}`}
            disabled={isLoading}
            placeholder="ejemplo@correo.com"
          />
          {formErrors.email && <p className="form-error">{formErrors.email}</p>}
        </div>

        {/* Campo de contraseña */}
        <div>
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={userData.password}
              onChange={handleChange}
              className={`form-input ${formErrors.password ? 'border-red-300' : 'border-gray-300'}`}
              disabled={isLoading}
              placeholder="Mínimo 6 caracteres"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {formErrors.password && <p className="form-error">{formErrors.password}</p>}
        </div>

        {/* Campo de confirmación de contraseña */}
        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={userData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
            disabled={isLoading}
            placeholder="Repite tu contraseña"
          />
          {formErrors.confirmPassword && <p className="form-error">{formErrors.confirmPassword}</p>}
        </div>

        {/* Botón de registro */}
        <div>
          <button
            type="submit"
            className="btn-primary w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </>
            ) : 'Registrarse'}
          </button>
        </div>
      </form>

      {/* Enlace a iniciar sesión */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;