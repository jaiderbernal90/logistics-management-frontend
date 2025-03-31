import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import ShipmentProvider from './context/ShipmentProvider';
import CreateShipmentPage from './pages/CreateShipmentPage';
import ShipmentTrackingPage from './pages/ShipmenTrackingPage';
import socketService from './services/socketService';
import { SOCKET_SERVER_URL } from './utils/socketConfigs';
import { useEffect } from 'react';
import ShipmentAdminListPage from './pages/admin/ShipmentAdminListPage';
import RouteAssignPage from './pages/admin/RouteAssignPage';

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
      <ShipmentProvider>
        <Routes>
          <Route path="/admin/shipments" element={<ShipmentAdminListPage />} />
          <Route path="/create-shipment" element={<CreateShipmentPage />} />
          {/* <Route path="/shipping/:id" element={<ShipmentDetailsPage />} /> */}
          <Route path="/track-shipment/:trackingNumber" element={<ShipmentTrackingPage />} />
          <Route path="/admin/shipments/routes" element={<RouteAssignPage />} />
        </Routes>
      </ShipmentProvider>
    </BrowserRouter>
  );
}

export default App;