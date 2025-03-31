export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
export const TOKEN_KEY = "auth_token";
export const TOKEN_EXPIRY_KEY = "auth_token_expiry";

export const PACKAGE_SIZES = [
  { value: "2 x 2 x 2", label: "Pequeño (hasta 5kg)" },
  { value: "5 x 5 x 5", label: "Mediano (5-15kg)" },
  { value: "10 x 10 x 10", label: "Grande (15-30kg)" },
  { value: "20 x 20 x 20", label: "Extra grande (más de 30kg)" },
];

export const SHIPMENT_STATES = [
  { value: "En espera", label: "En espera" },
  { value: "En tránsito", label: "En tránsito" },
  { value: "Entregado", label: "Entregado" },
  { value: "", label: "Todas" },
];

export const PRODUCT_TYPES = [
  { value: "documentos", label: "Documentos" },
  { value: "ropa", label: "Ropa y textiles" },
  { value: "electronica", label: "Electrónica" },
  { value: "alimentos", label: "Alimentos" },
  { value: "medicamentos", label: "Medicamentos" },
  { value: "otro", label: "Otro" },
];
