import RegisterForm from '../components/RegisterForm.tsx';

const RegisterPage = () => {


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">Coordinadora Logística</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Crea tu cuenta para gestionar tus envíos
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;