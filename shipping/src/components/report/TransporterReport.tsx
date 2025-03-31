import { Col, Flex, Statistic, Table, TableProps } from "antd";
import { useReport } from "../../hook/useReport";
import { useEffect } from "react";
import { TransporterReport as TransporterReportInterface } from "../../interfaces/report.interface";

export const TransporterReport: React.FC<{ startDate: string, endDate: string }> = ({ startDate, endDate }) => {

    const { fetchReportTransporter, state: stateReport } = useReport();
    const { reportTransporter } = stateReport;

    const columns: TableProps<TransporterReportInterface>['columns'] = [
        {
            title: 'Transportista',
            dataIndex: 'transporterName',
            key: 'transporterName',
        },
        {
            title: 'Envíos',
            dataIndex: 'totalShipments',
            key: 'totalShipments',
        },
        {
            title: 'Envíos Completados',
            dataIndex: 'completedShipments',
            key: 'completedShipments',
        },
        {
            title: 'Tiempo promedio',
            dataIndex: 'avgDeliveryTimeHours',
            key: 'avgDeliveryTimeHours',
        }
    ];

    useEffect(() => {
        fetchReportTransporter(startDate, endDate);
    }, [startDate, endDate]);

    return (
        <>
            <Flex vertical gap={48}>
                <Flex>
                    <Col span={12}>
                        <Statistic title="Total envios" value={reportTransporter?.totalShipments} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Tiempo promedio" value={reportTransporter?.overallAvgDeliveryTime} precision={2} />
                    </Col>
                </Flex>
                <Col span={12}>
                    <Table<TransporterReportInterface> columns={columns} dataSource={reportTransporter?.transporters} rowKey="trackingNumber" />
                </Col>
            </Flex>

        </>
    );
};

export default TransporterReport;