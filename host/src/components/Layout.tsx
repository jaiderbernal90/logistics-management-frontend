import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import { Content, Footer, Header as AntHeader } from 'antd/es/layout/layout';
import Header from './Header';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
    paddingTop: '64px',
    paddingBottom: '64px',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#88888',
};

const layoutStyle = {};


const Layout = () => {

    return (
        <div className='flex h-screen bg-gray-100 w-full'>
            <AntLayout style={layoutStyle}>
                <AntHeader style={headerStyle}><Header></Header></AntHeader>
                <Content style={contentStyle}><Outlet /></Content>
                <Footer style={footerStyle}>
                    Created by <a href="https://www.linkedin.com/in/jaider-bernal/" target='_blank' rel='noreferrer'>Jaider Bernal</a> 2025 &copy;
                </Footer>
            </AntLayout>
        </div>
    );
};

export default Layout;