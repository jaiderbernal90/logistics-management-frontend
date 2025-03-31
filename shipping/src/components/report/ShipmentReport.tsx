import { Flex, Table, TableProps, Tag } from "antd";
import { useReport } from "../../hook/useReport";
import { Shipment, ShipmentState } from "../../interfaces/shipment.interface";
import { getStatusColor } from "../../utils/functions";
import { useEffect } from "react";

export const ShipmentReport: React.FC<{ startDate: string, endDate: string; state?: ShipmentState, transporterId?: number }> = ({ startDate, endDate, state, transporterId }) => {

    const { fetchReportShipments, fetchReportTransporter, state: stateReport } = useReport();
    const { reportShipments } = stateReport;

    const columns: TableProps<Shipment>['columns'] = [
        {
            title: 'Número de rastreo',
            dataIndex: 'trackingNumber',
            key: 'trackingNumber',
        },
        {
            title: 'Transportista',
            dataIndex: 'transporterName',
            key: 'transporterName',
            render: (transporterName: string) => (
                <div style={{ marginBottom: '16px' }}>
                    {transporterName ? transporterName : 'Sin transportista'}
                </div>
            ),
        },
        {
            title: 'Ruta',
            dataIndex: 'routeName',
            key: 'routeName',
            render: (routeName: string) => (
                <div style={{ marginBottom: '16px' }}>
                    {routeName ? routeName : 'Sin ruta'}
                </div>
            ),
        },
        {
            title: 'Fecha de creación',
            dataIndex: 'date',
            key: 'date',
            render: (date: Date) => new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
        },
        {
            title: 'Fecha de entrega',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: (date: Date) => new Date(date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
        },
        {
            title: 'Dirección de origen',
            dataIndex: 'originAddress',
            key: 'originAddress',
        },
        {
            title: 'Dirección de destino',
            dataIndex: 'destinationAddress',
            key: 'destinationAddress',
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
        }
    ];

    useEffect(() => {
        fetchReportShipments(startDate, endDate, transporterId, state);
        fetchReportTransporter(startDate, endDate);
    }, [startDate, endDate, transporterId, state]);

    return (
        <>
            <Flex >
                <div>
                    <Table<Shipment> columns={columns} dataSource={reportShipments?.items} rowKey="trackingNumber" />
                </div>

            </Flex>
        </>
    );
};

export default ShipmentReport;