import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../src/utils/token';
import { Flex } from 'antd';

const Header = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState<{ title: string, path: string }[]>([]);

    const handleLogout = () => {
        window.dispatchEvent(new Event('auth:logout'));
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

    const handleLinks = () => {
        const token = localStorage.getItem('auth_token');
        const decodedToken = token ? decodeToken(token) : null;
        switch (decodedToken?.role) {
            case "ADMIN":
                setLinks([
                    { title: 'Envios', path: '/admin/shipments' },
                    { title: 'Reportes', path: '/admin/reports' },
                ]);
                break;
            case "CUSTOMER":
                setLinks([
                    { title: 'Envios', path: '/dashboard' },
                ]);
                break;
            case "DRIVER":
                setLinks([
                    { title: 'Iniciar Sesión', path: '/login' },
                    { title: 'Registrarse', path: '/register' },
                ]);
                break;
        }
    }

    useEffect(() => {
        handleLinks();
    }, []);


    return (
        <>
            <Flex justify='space-between' align='center' gap={32}>
                <Flex justify='flex-start' align='center' gap={32}>
                    {links.map((link, index) => (
                        <div key={index}>
                            <a onClick={ () => navigate(link.path) }>{link.title}</a>
                        </div>
                    ))}
                </Flex>

                <div>
                    <a onClick={handleLogout}>Cerrar Sesión</a>
                </div>
            </Flex>
        </>
    );
};

export default Header;