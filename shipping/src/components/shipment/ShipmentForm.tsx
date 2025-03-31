import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Alert,
  Card,
  Divider,
} from 'antd';
import { EnvironmentOutlined, SendOutlined } from '@ant-design/icons';
import { useShipment } from '../../hook/useShipment';
import { NewShipmentData } from '../../interfaces/shipment.interface';
import { PACKAGE_SIZES, PRODUCT_TYPES } from '../../config/constants';

const { TextArea } = Input;
const { Option } = Select;

export const ShipmentForm = () => {
  const { createShipment, state } = useShipment();
  const { isLoading, error } = state;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formSubmitted, setFormSubmitted] = useState(false);


  const onFinish = async (values: any) => {
    setFormSubmitted(true);

    const shipmentData: NewShipmentData = {
      origin_address: values.origin_address,
      destination_address: values.destination_address,
      package: {
        weight: values.weight,
        size: values.size,
        type_of_product: values.type_of_product,
        description: values.description,
        value: values.value
      }
    };

    const success = await createShipment(shipmentData);
    if (success) {
      navigate('/shipping');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
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
        initialValues={{
          weight: 0,
          value: 0,
          size: '',
          type_of_product: '',
          description: '',
          origin_address: '',
          destination_address: ''
        }}
      >
        <Divider orientation="left">Direcciones</Divider>

        <Form.Item
          name="origin_address"
          label="Dirección de Origen"
          rules={[{ required: true, message: 'La dirección de origen es requerida' }]}
        >
          <Input
            placeholder="Ingresa la dirección de origen"
            disabled={isLoading}
            prefix={<EnvironmentOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="destination_address"
          label="Dirección de Destino"
          rules={[{ required: true, message: 'La dirección de destino es requerida' }]}
        >
          <Input
            placeholder="Ingresa la dirección de destino"
            disabled={isLoading}
            prefix={<EnvironmentOutlined />}
          />
        </Form.Item>

        <Divider orientation="left">Detalles del Paquete</Divider>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="weight"
            label="Peso (kg)"
            rules={[{ required: true, message: 'El peso es requerido' },
            { type: 'number', min: 0.01, message: 'El peso debe ser mayor a 0' }]}
          >
            <InputNumber
              min={0.01}
              step={0.01}
              style={{ width: '100%' }}
              disabled={isLoading}
              placeholder="Ej. 1.5"
            />
          </Form.Item>

          <Form.Item
            name="size"
            label="Tamaño"
            rules={[{ required: true, message: 'El tamaño del paquete es requerido' }]}
          >
            <Select placeholder="Selecciona un tamaño" disabled={isLoading}>
              {PACKAGE_SIZES.map(size => (
                <Option key={size.value} value={size.value}>{size.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="type_of_product"
          label="Tipo de Producto"
          rules={[{ required: true, message: 'El tipo de producto es requerido' }]}
        >
          <Select placeholder="Selecciona un tipo de producto" disabled={isLoading}>
            {PRODUCT_TYPES.map(type => (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true, message: 'La descripción es requerida' }]}
        >
          <TextArea
            rows={3}
            placeholder="Describe el contenido del paquete"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="value"
          label="Valor Declarado ($)"
          rules={[{ required: true, message: 'El valor declarado es requerido' },
          { type: 'number', min: 0.01, message: 'El valor debe ser mayor a 0' }]}
        >
          <InputNumber
            min={0.01}
            step={0.01}
            style={{ width: '100%' }}
            disabled={isLoading}
            placeholder="Ej. 100.00"
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            size="large"
            icon={<SendOutlined />}
          >
            Crear Envío
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ShipmentForm;