import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../../services/authService';
import ShipmentReport from '../../components/report/ShipmentReport';
import { Button, DatePicker, Flex, Select, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import TransporterReport from '../../components/report/TransporterReport';
import { SHIPMENT_STATES } from '../../config/constants';
import { ShipmentState } from '../../interfaces/shipment.interface';
import { useTransporter } from '../../hook/useTransporter';
import { Transporter } from '../../interfaces/transporter.interface';

const { Text } = Typography;
const { Option } = Select;

const ReportsPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [state, setState] = useState<ShipmentState>();
  const [transporterId, setTransporterId] = useState<number>();

  const { fetchTransporters, state: stateTransporter } = useTransporter();
  const { transporters, isLoading } = stateTransporter;

  const onChangeStartDate: DatePickerProps['onChange'] = (_, dateString) => {
    setStartDate(dateString as string);
  };

  const onChangeEndDate: DatePickerProps['onChange'] = (_, dateString) => {
    setEndDate(dateString as string);
  };

  const handleChangeType = (e: ShipmentState) => {
    setState(e);
  }

  const handleChangeTransporter = (e: Transporter) => {
    console.log(e.id);
    setTransporterId(e.id);
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!isAdmin()) {
      navigate('/admin/shipments');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    fetchTransporters();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Flex justify='space-between' className='mb-6 text-left w-full'>
          <div className='text-left'>
            <h1 className="text-3xl font-bold text-gray-900 text-left">Estadísticas e informes de tus envíos</h1>
          </div>
          <Button type="link" onClick={() => navigate('/admin/shipments')}>Volver</Button>
        </Flex>

        <Flex justify='flex-start' align='center' className='mb-6 text-left' gap={16}>
          <Text>Selecciona un periodo de tiempo para ver los detalles de tus envíos</Text>

          <div style={{ display: 'flex', gap: '8px' }}>
            <DatePicker
              onChange={onChangeStartDate}
              placeholder='Desde'
              value={startDate ? dayjs(startDate) : null}
            />
            <DatePicker
              onChange={onChangeEndDate}
              placeholder='Hasta'
              value={endDate ? dayjs(endDate) : null}
            />
            <Select placeholder="Filtro de estado" onChange={e => handleChangeType(e)}>
              {SHIPMENT_STATES.map(size => (
                <Option key={size.value} value={size.value}>{size.label}</Option>
              ))}
            </Select>

            <Select
              placeholder="Filtro por transportista"
              loading={isLoading}
              disabled={isLoading}
              showSearch
              optionFilterProp="children"
              onChange={e => handleChangeTransporter(e)}
            >
              {transporters?.map((transporter: Transporter) => (
                <Option key={transporter.id} value={transporter.id}>
                  {transporter.name} {transporter.plate ? `- ${transporter.plate}` : ''}
                </Option>
              ))}
            </Select>
          </div>
        </Flex>

        <Flex gap={48} align='start'>
          {(startDate && endDate) && <ShipmentReport startDate={startDate} endDate={endDate} state={state} transporterId={transporterId} />}
          {(startDate && endDate) && <TransporterReport startDate={startDate} endDate={endDate} />}
        </Flex>
      </div>
    </div>
  );
};

export default ReportsPage;