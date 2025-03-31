import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateShipmentPage from './pages/CreateShipmentPage';
import ShipmentTrackingPage from './pages/ShipmenTrackingPage';
import socketService from './services/socketService';
import { SOCKET_SERVER_URL } from './utils/socketConfigs';
import { useEffect } from 'react';
import ShipmentAdminListPage from './pages/admin/ShipmentAdminListPage';
import RouteAssignPage from './pages/admin/RouteAssignPage';
import Providers from './context/Providers';
import ReportsPage from './pages/admin/ReportsPage';

function App() {

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      socketService.initialize(SOCKET_SERVER_URL);
    }

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/create-shipment" element={<CreateShipmentPage />} />
          <Route path="/track-shipment/:trackingNumber" element={<ShipmentTrackingPage />} />
          <Route path="/admin/shipments/routes" element={<RouteAssignPage />} />
          <Route path="/admin/shipments" element={<ShipmentAdminListPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;