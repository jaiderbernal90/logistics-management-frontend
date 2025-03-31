import { useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../../services/authService';
import RouteAssignmentAdmin from '../../components/shipment/admin/AssignRoutes';
import { Button, Flex } from 'antd';

const RouteAssignPage = () => {
  const navigate = useNavigate();
  const { shipmentId } = useParams<{ shipmentId: string }>();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!isAdmin() || !shipmentId) {
      navigate('/admin/shipments');
      return;
    }
  }, [navigate, shipmentId]);

  if (!shipmentId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">No se especificó un envío para asignar ruta.</span>
          </div>
          <Link to="/shipping" className="text-indigo-600 hover:text-indigo-900">
            Volver a la lista de envíos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Flex justify='flex-start' className='mb-6 text-left'>
          <Button type="link" onClick={() => navigate('/admin/shipments')}>Volver</Button>
        </Flex>

        <RouteAssignmentAdmin shipmentId={parseInt(shipmentId)} />
      </div>
    </div>
  );
};

export default RouteAssignPage;