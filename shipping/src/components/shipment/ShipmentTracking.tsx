import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Timeline, Spin, Typography, Row, Col, Divider, Tag, Alert } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useShipment } from '../../hook/useShipment';
import { useWebSocket } from '../../hook/useSocket';
import { getStatusColor } from '../../utils/functions';

const { Title, Text } = Typography;

const ShipmentTracking: React.FC = () => {
    const { fetchHistoryShipments, state } = useShipment();
    const { shipmentHistory, isLoading: loading, error } = state;

    const { trackingNumber } = useParams<{ trackingNumber: string }>();

    const {
        updates,
    } = useWebSocket(trackingNumber || '');

    useEffect(() => {
        if (trackingNumber) {
            fetchHistoryShipments(trackingNumber);
        }
    }, [trackingNumber]);

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

    if (loading) {
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

    if (!shipmentHistory) {
        return (
            <Alert
                message="No se encontró información"
                description="No se encontró información para el número de seguimiento proporcionado."
                type="info"
                showIcon
                style={{ maxWidth: '800px', margin: '50px auto' }}
            />
        );
    }

    const combinedHistory = [...shipmentHistory.status_history];

    updates.forEach(update => {
        const isDuplicate = combinedHistory.some(item =>
            item.status === update.status &&
            item.location === update.location &&
            item.created_at === update.created_at
        );

        if (!isDuplicate) {
            combinedHistory.push(update);
        }
    });

    const sortedHistory = combinedHistory.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return (

        <div className="tracking-page" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Title level={2}>Seguimiento de Envío</Title>
            <Text type="secondary">Número de rastreo: {shipmentHistory.shipment.tracking_number}</Text>

            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                <Col xs={24} md={8}>
                    <Card title="Información del Envío" className="info-card">
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Estado actual: </Text>
                            <Tag color={getStatusColor(shipmentHistory.shipment.state)}>{shipmentHistory.shipment.state}</Tag>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Fecha de creación: </Text>
                            <Text>{formatDate((shipmentHistory.shipment.date).toString())}</Text>
                        </div>

                        {shipmentHistory.shipment.delivery_date && (
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Fecha de entrega: </Text>
                                <Text>{formatDate((shipmentHistory.shipment.delivery_date).toString())}</Text>
                            </div>
                        )}

                        <Divider style={{ margin: '12px 0' }} />

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Origen: </Text>
                            <Text>{shipmentHistory.shipment.origin_address}</Text>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Destino: </Text>
                            <Text>{shipmentHistory.shipment.destination_address}</Text>
                        </div>
                    </Card>

                    <Card title="Detalles del Paquete" style={{ marginTop: '24px' }} className="info-card">
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Tipo de producto: </Text>
                            <Text>{shipmentHistory.package.type_of_product}</Text>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Peso: </Text>
                            <Text>{shipmentHistory.package.weight} kg</Text>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Dimensiones: </Text>
                            <Text>{shipmentHistory.package.size}</Text>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <Text strong>Valor declarado: </Text>
                            <Text>${(shipmentHistory.package.value).toLocaleString('es-CO')}</Text>
                        </div>

                        {shipmentHistory.package.description && (
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Descripción: </Text>
                                <Text>{shipmentHistory.package.description}</Text>
                            </div>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Card title="Historial de Estados" className="timeline-card">
                        <Timeline
                            mode="left"
                            items={sortedHistory.map(status => ({
                                label: formatDate(status.created_at),
                                dot: status.status === 'Entregado'
                                    ? <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                    : status.status === 'En tránsito'
                                        ? <LoadingOutlined style={{ color: '#1890ff' }} />
                                        : status.status === 'En espera'
                                            ? <ClockCircleOutlined style={{ color: '#faad14' }} />
                                            : <EnvironmentOutlined style={{ color: '#1890ff' }} />,
                                color: getStatusColor(status.status),
                                children: (
                                    <div style={{ paddingBottom: '20px' }}>
                                        <Text strong style={{ fontSize: '16px', display: 'block' }}>
                                            {status.status}
                                        </Text>
                                        <Text type="secondary">
                                            {status.location}
                                        </Text>
                                    </div>
                                ),
                            }))}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ShipmentTracking;