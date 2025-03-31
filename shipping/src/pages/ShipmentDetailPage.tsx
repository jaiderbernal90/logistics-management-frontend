import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../services/authService';
import { useShipment } from '../hook/useShipment';
import { Shipment, ShipmentState } from '../interfaces/shipment.interface';

const ShipmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getShipmentById, state } = useShipment();
  const { isLoading, error } = state;
  const navigate = useNavigate();
  
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const adminUser = isAdmin();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const loadShipment = async () => {
      if (id) {
        const data = await getShipmentById(parseInt(id));
        setShipment(data);
      }
    };

    loadShipment();
  }, [id, getShipmentById, navigate]);

  const getStatusClass = (status: ShipmentState) => {
    switch (status) {
      case ShipmentState.EN_ESPERA:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ShipmentState.EN_TRANSITO:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case ShipmentState.ENTREGADO:
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
          <Link to="/shipping" className="text-indigo-600 hover:text-indigo-900">
            Volver a la lista de envíos
          </Link>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">No se encontró el envío solicitado.</span>
          </div>
          <Link to="/shipping" className="text-indigo-600 hover:text-indigo-900">
            Volver a la lista de envíos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalles del Envío</h1>
            <p className="mt-2 text-sm text-gray-600">
              Consulta la información completa de tu envío
            </p>
          </div>
          <div className="flex space-x-2">
            <Link to="/shipping" className="btn-secondary">
              Volver a la lista
            </Link>
            {adminUser && shipment.state === ShipmentState.EN_ESPERA && (
              <Link
                to={`/shipping/routes?shipment=${shipment.id}`}
                className="btn-primary"
              >
                Asignar Ruta
              </Link>
            )}
          </div>
        </header>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Envío #{shipment?.tracking_number}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Creado el {new Date(shipment.date).toLocaleDateString()}
              </p>
            </div>
            <div className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusClass(shipment.state)}`}>
              {shipment.state}
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Dirección de origen</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {shipment.origin_address}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Dirección de destino</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {shipment.destination_address}
                </dd>
              </div>
              {shipment.package && (
                <>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Detalles del paquete</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">Peso: {shipment.package.weight} kg</span>
                          </div>
                        </li>
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">Tamaño: {shipment.package.size}</span>
                          </div>
                        </li>
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">Tipo de producto: {shipment.package.type_of_product}</span>
                          </div>
                        </li>
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">Descripción: {shipment.package.description}</span>
                          </div>
                        </li>
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">Valor declarado: ${shipment.package.value.toFixed(2)}</span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </>
              )}
              {shipment.route_id && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Ruta asignada</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Ruta #{shipment.route_id}
                  </dd>
                </div>
              )}
              {shipment.transporter_id && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Transportista</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ID: {shipment.transporter_id}
                  </dd>
                </div>
              )}
              {shipment.delivery_date && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Fecha estimada de entrega</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(shipment.delivery_date).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsPage;