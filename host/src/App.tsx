import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

const LoginPage = lazy(() => import('auth/LoginPage'));
const RegisterPage = lazy(() => import('auth/RegisterPage'));
const AuthProvider = lazy(() => import('auth/AuthProvider'));
const ShipmentListPage = lazy(() => import('shipping/ShipmentListPage'));
const CreateShipment = lazy(() => import('shipping/CreateShipmentPage'));
const TrackShipment = lazy(() => import('shipping/ShipmentTrackingPage'));
const ShipmentProvider = lazy(() => import('shipping/ShipmentProvider'));
const ShipmentAdminListPage = lazy(() => import('shipping/ShipmentAdminListPage'));
const RouteAssignPage = lazy(() => import('shipping/RouteAssignPage'));

const Loading = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
);

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
    const isAuthenticated = localStorage.getItem('auth_token') !== null;
    return isAuthenticated ? element : <Navigate to="/login" />;
};

// Componentes que necesitan providers específicos
const ShippingComponent = ({ Component }: { Component: React.ComponentType<any> }) => (
    <Suspense fallback={<Loading />}>
        <ShipmentProvider>
            <Component />
        </ShipmentProvider>
    </Suspense>
);

const AuthComponent = ({ Component }: { Component: React.ComponentType<any> }) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        localStorage.getItem('auth_token') !== null
    );

    // Escuchar eventos de autenticación de los microfrontends
    useEffect(() => {
        const handleLoginSuccess = (event: any) => {
            setIsAuthenticated(true);
        };

        const handleLogout = () => {
            setIsAuthenticated(false);
        };

        window.addEventListener('auth:login:success', handleLoginSuccess);
        window.addEventListener('auth:register:success', handleLoginSuccess);
        window.addEventListener('auth:logout', handleLogout);

        return () => {
            window.removeEventListener('auth:login:success', handleLoginSuccess);
            window.removeEventListener('auth:register:success', handleLoginSuccess);
            window.removeEventListener('auth:logout', handleLogout);
        };
    }, []);

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<AuthComponent Component={LoginPage} />} />
                        <Route path="/register" element={<AuthComponent Component={RegisterPage} />} />

                        <Route path="/" element={<Layout />}>
                            <Route index element={
                                <PrivateRoute element={
                                    <ShippingComponent Component={ShipmentListPage} />
                                } />
                            } />
                            <Route path="dashboard" element={
                                <PrivateRoute element={
                                    <ShippingComponent Component={ShipmentListPage} />
                                } />
                            } />
                            <Route path="create-shipment" element={
                                <PrivateRoute element={
                                    <ShippingComponent Component={CreateShipment} />
                                } />
                            } />
                            <Route path="track-shipment/:trackingNumber" element={
                                <PrivateRoute element={
                                    <ShippingComponent Component={TrackShipment} />
                                } />
                            } />

                            <Route path="admin/shipments" element={
                                <PrivateRoute element={
                                    <ShippingComponent Component={ShipmentAdminListPage} />
                                } />
                            } />

                            <Route path="admin/assign-route/:shipmentId" element={
                                <PrivateRoute element={
                                    <ShippingComponent Component={RouteAssignPage} />
                                } />
                            } />
                        </Route>

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AuthProvider>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;