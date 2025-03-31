import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../../services/authService';
import ShipmentAdminList from '../../components/shipment/admin/ShipmentAdminList';

const ShipmentAdminListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() && !isAdmin()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administrador</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona tus envíos y realiza seguimiento a tus paquetes
          </p>
        </header>

        <ShipmentAdminList />
      </div>
    </div>
  );
};

export default ShipmentAdminListPage;