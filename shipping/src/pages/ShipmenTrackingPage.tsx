import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';
import ShipmentTracking from '../components/shipment/ShipmentTracking';

const ShipmentTrackingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Envíos</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona tus envíos y realiza seguimiento a tus paquetes
          </p>
        </header>

        <ShipmentTracking/>
      </div>
    </div>
  );
};

export default ShipmentTrackingPage;