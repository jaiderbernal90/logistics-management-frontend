import React, { useEffect } from 'react';
import { notification } from 'antd';
import { StatusUpdateData } from '../../services/socketService';

interface TrackingNotificationProps {
    lastUpdate: StatusUpdateData | null;
    connected: boolean;
}

const TrackingNotification: React.FC<TrackingNotificationProps> = ({ lastUpdate, connected }) => {
    useEffect(() => {
        if (lastUpdate) {
            notification.info({
                message: 'Actualización de envío',
                description: `El envío #${lastUpdate.trackingNumber} ha cambiado a estado "${lastUpdate.status}" en ${lastUpdate.location}`,
                duration: 5,
                placement: 'topRight'
            });
        }
    }, [lastUpdate]);

    // Mostrar notificación cuando cambia el estado de conexión
    useEffect(() => {
        // Solo mostrar notificación cuando el estado cambia a conectado
        if (connected) {
            notification.success({
                message: 'Conectado',
                description: 'Recibirás actualizaciones de tu envío en tiempo real',
                duration: 3,
                placement: 'topRight'
            });
        }
    }, [connected]);

    return null;
};

export default TrackingNotification;