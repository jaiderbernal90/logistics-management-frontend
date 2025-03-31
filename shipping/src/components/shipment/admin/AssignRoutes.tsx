import React, { useEffect } from 'react';
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
  Row,
  Col
} from 'antd';
import { ArrowRightOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons';
import { Transporter } from '../../../interfaces/transporter.interface';
import { Route, RouteAssignmentData } from '../../../interfaces/route.interface';
import { useShipment } from '../../../hook/useShipment';
import { useRoute } from '../../../hook/useRoute';
import { useTransporter } from '../../../hook/useTransporter';

const { Option } = Select;
const { Title, Text } = Typography;

interface RouteAssignmentProps {
  shipmentId: number;
}

const RouteAssignmentAdmin: React.FC<RouteAssignmentProps> = ({ shipmentId }) => {

  const {
    assignRoute,
    state,
    getShipmentById
  } = useShipment();

  const { fetchRoutes, state: stateRoute } = useRoute();
  const { fetchTransporters, state: stateTransporter } = useTransporter();

  const {
    isLoading,
    error,
    selectedShipment
  } = state;

  const { routes } = stateRoute;
  const { transporters } = stateTransporter;

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (shipmentId) {
      fetchTransporters();
      fetchRoutes();
      getShipmentById(+shipmentId);
    }
  }, [shipmentId]);

  useEffect(() => {
    if (selectedShipment) {
      form.setFieldsValue({
        origin_address: selectedShipment.origin_address,
        destination_address: selectedShipment.destination_address
      });
    }
  }, [selectedShipment, form]);

  const onFinish = async (values: any) => {
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ maxWidth: '800px', margin: '50px auto' }}
      />
    );
  }

  if (!selectedShipment) {
    return (
      <Alert
        message="No se encontró información"
        description="No se encontró información para el envío solicitado."
        type="info"
        showIcon
        style={{ maxWidth: '800px', margin: '50px auto' }}
      />
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>Asignar Ruta y Transportista</Title>
      <Text type="secondary">Envío: {selectedShipment.tracking_number}</Text>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={8}>
          <Card title="Información del Envío" className="info-card">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Estado actual: </Text>
              <Text>{selectedShipment.state}</Text>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Text strong>Fecha de creación: </Text>
              <Text>{formatDate((selectedShipment.date).toString())}</Text>
            </div>

            {selectedShipment.delivery_date && (
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Fecha de entrega: </Text>
                <Text>{formatDate((selectedShipment.delivery_date).toString())}</Text>
              </div>
            )}

            <Divider style={{ margin: '12px 0' }} />

            <div style={{ marginBottom: '16px' }}>
              <Text strong>Origen: </Text>
              <Text>{selectedShipment.origin_address}</Text>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Text strong>Destino: </Text>
              <Text>{selectedShipment.destination_address}</Text>
            </div>
          </Card>

          {selectedShipment.package && (
            <Card title="Detalles del Paquete" style={{ marginTop: '24px' }} className="info-card">
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Tipo de producto: </Text>
                <Text>{selectedShipment.package.type_of_product}</Text>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong>Peso: </Text>
                <Text>{selectedShipment.package.weight} kg</Text>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong>Dimensiones: </Text>
                <Text>{selectedShipment.package.size}</Text>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong>Valor declarado: </Text>
                <Text>${(selectedShipment.package.value).toLocaleString('es-CO')}</Text>
              </div>

              {selectedShipment.package.description && (
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Descripción: </Text>
                  <Text>{selectedShipment.package.description}</Text>
                </div>
              )}
            </Card>
          )}
        </Col>

        <Col xs={24} md={16}>
          <Card title="Asignación de Ruta y Transportista" className="assignment-card">
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
            >
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

              <Divider orientation="left">Seleccionar Asignación</Divider>

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
                  {routes?.map((route: Route) => (
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
                  {transporters?.map((transporter: Transporter) => (
                    <Option key={transporter.id} value={transporter.id}>
                      {transporter.name} {transporter.plate ? `- ${transporter.plate}` : ''}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => navigate('/admin/shipments')}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  icon={<SendOutlined />}
                >
                  Asignar Ruta
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RouteAssignmentAdmin;