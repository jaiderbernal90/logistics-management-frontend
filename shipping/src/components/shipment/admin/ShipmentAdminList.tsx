import { useEffect } from 'react';
import { Button, Flex, Select, Spin, Table, TableProps, Tag } from "antd";
import { useNavigate } from 'react-router-dom';
import { useShipment } from '../../../hook/useShipment';
import { Shipment, ShipmentState } from '../../../interfaces/shipment.interface';
import { getStatusColor } from '../../../utils/functions';
import { SHIPMENT_STATES } from '../../../config/constants';

const { Option } = Select;


const ShipmentAdminList = () => {
    const { state, fetchAllShipments } = useShipment();
    const { shipmentsAdmin, isLoading } = state;
    const navigate = useNavigate();


    const columns: TableProps<Shipment>['columns'] = [
        {
            title: 'Número de rastreo',
            dataIndex: 'tracking_number',
            key: 'tracking_number',
        },
        {
            title: 'Transportista',
            dataIndex: 'transporter_name',
            key: 'transporter_name',
        },
        {
            title: 'Ruta',
            dataIndex: 'route_name',
            key: 'route_name',
        },
        {
            title: 'Fecha de creación',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: Date) => new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
        },
        {
            title: 'Fecha de entrega',
            dataIndex: 'delivery_date',
            key: 'delivery_date',
            render: (date: Date) => new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
        },
        {
            title: 'Dirección de origen',
            dataIndex: 'origin_address',
            key: 'origin_address',
        },
        {
            title: 'Dirección de destino',
            dataIndex: 'destination_address',
            key: 'destination_address',
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            render: (state: ShipmentState) => (
                <div style={{ marginBottom: '16px' }}>
                    <Tag color={getStatusColor(state)}>{state}</Tag>
                </div>
            ),
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, shipment: Shipment) => (
                <div className="flex space-x-2">
                    {shipment.state === ShipmentState.EN_ESPERA && <Button type="link" onClick={() => { navigate(`/admin/assign-route/${shipment.id}`) }}>
                        Asignar guía
                    </Button>}
                </div>
            ),
        }
    ];


    useEffect(() => {
        fetchAllShipments(null);
    }, []);

    const handleChangeType = (e: ShipmentState) => {
        console.log(e);
        fetchAllShipments(e);
    }

    return (
        <>
            <Flex justify='space-between' className='mb-6' align='center'>
                <h2 className="text-2xl font-bold text-gray-800">Envíos</h2>
                <Select placeholder="Filtro de estados" disabled={isLoading} onChange={e => handleChangeType(e)}>
                    {SHIPMENT_STATES.map(size => (
                        <Option key={size.value} value={size.value}>{size.label}</Option>
                    ))}
                </Select>
            </Flex>

            {
                isLoading ? <Spin /> : <Table<Shipment> columns={columns} dataSource={shipmentsAdmin} rowKey="tracking_number" />
            }

        </>
    );
};

export default ShipmentAdminList;