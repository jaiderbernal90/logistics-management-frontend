import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShipmentForm from '../components/shipment/ShipmentForm';
import { isAuthenticated } from '../services/authService';
import { Button, Flex } from 'antd';

const CreateShipmentPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <Flex justify='space-between' className='mb-6 text-left'>
                <div className='text-left'>
                    <h1 className="text-3xl font-bold text-gray-900 text-left">Crear Nuevo Envío</h1>
                    <p className="mt-2 text-sm text-gray-600 text-left">
                        Ingresa la información para registrar un nuevo envío
                    </p>
                </div>
                <Button type="link" onClick={() => navigate('/')}>Volver</Button>
            </Flex>

            <ShipmentForm />
        </div>
    );
};

export default CreateShipmentPage;