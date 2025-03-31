import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../services/authService';
import { useShipment } from '../../hook/useShipment';
import { RouteAssignmentData, Shipment, Transporter } from '../../interfaces/shipment.interface';
import { Button } from '../common/Button';

interface RouteAssignmentProps {
  shipmentId: number;
}

const RouteAssignment: React.FC<RouteAssignmentProps> = ({ shipmentId }) => {
  const { state, fetchRoutes, fetchTransporters, assignRoute, getShipmentById } = useShipment();
  const { routes, transporters, isLoading, error } = state;
  const navigate = useNavigate();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<number | ''>('');
  const [selectedTransporter, setSelectedTransporter] = useState<number | ''>('');
  const [availableTransporters, setAvailableTransporters] = useState<Transporter[]>([]);
  const [formErrors, setFormErrors] = useState<{ route?: string; transporter?: string }>({});

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/shipping');
    }
  }, [navigate]);

  useEffect(() => {
    fetchRoutes();
    fetchTransporters();
  }, [fetchRoutes, fetchTransporters]);

  useEffect(() => {
    const loadShipment = async () => {
      const shipmentData = await getShipmentById(shipmentId);
      if (shipmentData) {
        setShipment(shipmentData);
      } else {
        navigate('/shipping');
      }
    };

    loadShipment();
  }, [shipmentId, getShipmentById, navigate]);

  // Filtrar transportistas disponibles cuando se selecciona una ruta
  useEffect(() => {
    if (selectedRoute && transporters.length > 0) {
      // En un caso real, aquí haríamos una llamada a la API para obtener
      // los transportistas disponibles para esta ruta específica
      // Por ahora, solo filtramos los que están disponibles
      setAvailableTransporters(transporters.filter(t => t.available));
    } else {
      setAvailableTransporters([]);
    }
  }, [selectedRoute, transporters]);

  const validateForm = (): boolean => {
    const errors: { route?: string; transporter?: string } = {};
    let isValid = true;

    if (!selectedRoute) {
      errors.route = 'Debes seleccionar una ruta';
      isValid = false;
    }

    if (!selectedTransporter) {
      errors.transporter = 'Debes seleccionar un transportista';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : '';
    setSelectedRoute(value);
    setSelectedTransporter(''); // Reset transporter selection when route changes

    if (formErrors.route) {
      setFormErrors(prev => ({ ...prev, route: undefined }));
    }
  };

  const handleTransporterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : '';
    setSelectedTransporter(value);

    if (formErrors.transporter) {
      setFormErrors(prev => ({ ...prev, transporter: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !shipment) {
      return;
    }

    const assignmentData: RouteAssignmentData = {
      shipment_id: shipment.id as number,
      route_id: selectedRoute as number,
      transporter_id: selectedTransporter as number
    };

    const success = await assignRoute(assignmentData);
    if (success) {
      navigate('/shipping');
    }
  };

  if (isLoading || !shipment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Asignar Ruta y Transportista</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Información del Envío</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Número de rastreo</p>
            <p className="font-medium">{shipment?.tracking_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de creación</p>
            <p className="font-medium">{new Date(shipment.date).toLocaleDateString()}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Origen</p>
            <p className="font-medium">{shipment.origin_address}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Destino</p>
            <p className="font-medium">{shipment.destination_address}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="route" className="form-label">Ruta</label>
          <select
            id="route"
            name="route"
            value={selectedRoute}
            onChange={handleRouteChange}
            className={`form-input ${formErrors.route ? 'border-red-300' : 'border-gray-300'}`}
            disabled={isLoading}
          >
            <option value="">Selecciona una ruta</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>
                {route.name} - {route.origin} a {route.destination}
              </option>
            ))}
          </select>
          {formErrors.route && <p className="form-error">{formErrors.route}</p>}
        </div>

        <div>
          <label htmlFor="transporter" className="form-label">Transportista</label>
          <select
            id="transporter"
            name="transporter"
            value={selectedTransporter}
            onChange={handleTransporterChange}
            className={`form-input ${formErrors.transporter ? 'border-red-300' : 'border-gray-300'}`}
            disabled={isLoading || !selectedRoute}
          >
            <option value="">Selecciona un transportista</option>
            {availableTransporters.map(transporter => (
              <option key={transporter.id} value={transporter.id}>
                {transporter.name} - {transporter.vehicle_type} (Capacidad: {transporter.capacity}kg)
              </option>
            ))}
          </select>
          {!selectedRoute && <p className="text-sm text-gray-500 mt-1">Primero selecciona una ruta</p>}
          {formErrors.transporter && <p className="form-error">{formErrors.transporter}</p>}
        </div>

        <div className="flex space-x-4">
          <Button
            type="button"
            className="flex-1"
            onClick={() => navigate('/shipping')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            className="flex-1"
          >
            Asignar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RouteAssignment;