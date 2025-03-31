import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
  Alert,
  Card,
  Divider,
  Spin,
  Typography,
  Space,
} from 'antd';
import { ArrowRightOutlined, SendOutlined } from '@ant-design/icons';
import { useShipment } from '../../../hook/useShipment';
import { RouteAssignmentData } from '../../../interfaces/shipment.interface';

const { Option } = Select;
const { Title, Text } = Typography;

interface RouteAssignmentProps {
  shipmentId: number;
}

const RouteAssignmentAdmin: React.FC<RouteAssignmentProps> = ({ shipmentId }) => {
  const {
    assignRoute,
    state,
    fetchAllTransporters,
    fetchAllRoutes,
    getShipmentById
  } = useShipment();

  const {
    isLoading,
    error,
    transporters,
    routes,
    selectedShipment
  } = state;

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchAllTransporters();
    fetchAllRoutes();
    getShipmentById(+shipmentId);
  }, []);

  useEffect(() => {
    if (selectedShipment) {
      form.setFieldsValue({
        origin_address: selectedShipment.origin_address,
        destination_address: selectedShipment.destination_address
      });
    }
  }, [selectedShipment, form]);

  const onFinish = async (values: any) => {
    setFormSubmitted(true);

    const shipmentData: RouteAssignmentData = {
      shipment_id: +(shipmentId || 0),
      route_id: values.route_id,
      transporter_id: values.transporter_id
    };

    const success = await assignRoute(shipmentData);
    if (success) {
      navigate('/admin/shipments');
    }
  };

  if (isLoading && !selectedShipment) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Cargando información..." />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <Title level={3} className="text-center mb-4">Asignar Ruta y Transportista</Title>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      {formSubmitted && form.getFieldsError().some(({ errors }) => errors.length) && (
        <Alert
          message="Error de validación"
          description="Por favor corrige los errores en el formulario."
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Divider orientation="left">Información del Envío</Divider>

        {selectedShipment && (
          <div className="bg-gray-50 p-4 rounded mb-6">
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between">
                <Text strong>Número de Rastreo:</Text>
                <Text>{selectedShipment.tracking_number}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Estado:</Text>
                <Text>{selectedShipment.state}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Fecha de Creación:</Text>
                <Text>{new Date(selectedShipment.date).toLocaleDateString()}</Text>
              </div>
            </Space>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Form.Item
            name="origin_address"
            label="Origen"
          >
            <Input
              disabled
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </Form.Item>

          <Form.Item
            name="destination_address"
            label="Destino"
          >
            <Input
              disabled
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </Form.Item>
        </div>

        <Divider orientation="left">Asignación</Divider>

        <Form.Item
          name="route_id"
          label="Ruta"
          rules={[{ required: true, message: 'Por favor selecciona una ruta' }]}
        >
          <Select
            placeholder="Selecciona una ruta"
            loading={isLoading}
            disabled={isLoading}
            showSearch
            optionFilterProp="children"
          >
            {routes?.map(route => (
              <Option key={route.id} value={route.id}>
                {route.name} ({route.origin} <ArrowRightOutlined /> {route.destination})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="transporter_id"
          label="Transportista"
          rules={[{ required: true, message: 'Por favor selecciona un transportista' }]}
        >
          <Select
            placeholder="Selecciona un transportista"
            loading={isLoading}
            disabled={isLoading}
            showSearch
            optionFilterProp="children"
          >
            {transporters?.map(transporter => (
              <Option key={transporter.id} value={transporter.id}>
                {transporter.name} {transporter.plate ? `- ${transporter.plate}` : ''}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="mt-8">
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/admin/shipments')}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="flex-1"
              icon={<SendOutlined />}
            >
              Asignar
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RouteAssignmentAdmin;