import { useEffect } from 'react';
import { useShipment } from '../../hook/useShipment';
import { Shipment, ShipmentState } from '../../interfaces/shipment.interface';
import { Button, Flex, Spin, Table, TableProps, Tag } from "antd";
import { useNavigate } from 'react-router-dom';
import { getStatusColor } from '../../utils/functions';

const ShipmentList = () => {
    const { state, fetchShipments } = useShipment();
    const { shipments, isLoading } = state;
    const navigate = useNavigate();


    const columns: TableProps<Shipment>['columns'] = [
        {
            title: 'Número de rastreo',
            dataIndex: 'tracking_number',
            key: 'tracking_number',
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
                    <Button type="link" onClick={() => { navigate(`/track-shipment/${shipment.tracking_number}`) }}>
                        Historial
                    </Button>
                </div>
            ),
        }
    ];


    useEffect(() => {
        fetchShipments();
    }, []);

    return (
        <>
            <Flex justify='space-between' className='mb-6' align='center'>
                <h2 className="text-2xl font-bold text-gray-800">Envíos</h2>
                <Button type="link" onClick={() => navigate('/create-shipment')}>Nuevo envio</Button>
            </Flex>

            {
                isLoading ? <Spin /> : <Table<Shipment> columns={columns} dataSource={shipments} rowKey="tracking_number" />
            }

        </>
    );
};

export default ShipmentList;