import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shipping",
      filename: "remoteEntry.js",
      exposes: {
        "./ShippingApp": "./src/App.tsx",
        "./CreateShipmentPage": "./src/pages/CreateShipmentPage.tsx",
        "./ShipmentListPage": "./src/pages/ShipmentListPage.tsx",
        "./ShipmentFormPage": "./src/pages/CreateShipmentPage.tsx",
        "./ShipmentProvider": "./src/context/shipment/ShipmentProvider.tsx",
        "./TransporterProvider":
          "./src/context/transporter/TransporterProvider.tsx",
        "./RouteProvider": "./src/context/route/RouteProvider.tsx",
        "./ReportProvider": "./src/context/report/ReportProvider.tsx",
        "./ShipmentAppProvider": "./src/context/Providers.tsx",
        "./ShipmentDetailsPage": "./src/pages/ShipmentDetailPage.tsx",
        "./RouteAssignPage": "./src/pages/admin/RouteAssignPage.tsx",
        "./ShipmentTrackingPage": "./src/pages/ShipmenTrackingPage.tsx",
        "./ShipmentAdminListPage":
          "./src/pages/admin/ShipmentAdminListPage.tsx",
        "./ReportAdminPage": "./src/pages/admin/ReportsPage.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 5002,
  },
  preview: {
    port: 5002,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
