declare module "auth/LoginPage" {
  import React from "react";
  const LoginPage: React.ComponentType;
  export default LoginPage;
}

declare module "auth/RegisterPage" {
  import React from "react";
  const RegisterPage: React.ComponentType;
  export default RegisterPage;
}

declare module "auth/AuthProvider" {
  import React from "react";
  const AuthProvider: React.ComponentType<{ children: React.ReactNode }>;
  export default AuthProvider;
}

declare module "shipping/ShipmentProvider" {
  import React from "react";
  const ShipmentProvider: React.ComponentType<{ children: React.ReactNode }>;
  export default ShipmentProvider;
}

declare module "shipping/ShipmentAdminListPage" {
  import React from "react";
  const ShipmentAdminListPage: React.ComponentType<{ children: React.ReactNode }>;
  export default ShipmentAdminListPage;
}

declare module "shipping/RouteAssignPage" {
  import React from "react";
  const RouteAssignPage: React.ComponentType<{ children: React.ReactNode }>;
  export default RouteAssignPage;
}
declare module "shipping/ShipmentTrackingPage" {
  import React from "react";
  const ShipmentTrackingPage: React.ComponentType<{ children: React.ReactNode }>;
  export default ShipmentTrackingPage;
}

declare module "shipping/ShipmentListPage" {
  import React from "react";
  const ShipmentListPage: React.ComponentType;
  export default ShipmentListPage;
}

declare module "shipping/CreateShipmentPage" {
  import React from "react";
  const CreateShipmentPage: React.ComponentType;
  export default CreateShipmentPage;
}

interface WindowEventMap {
  "auth:login:success": CustomEvent<{ redirect: string }>;
  "auth:register:success": CustomEvent<{ redirect: string }>;
  "auth:logout": Event;
}
