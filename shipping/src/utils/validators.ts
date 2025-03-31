export const validateAddress = (address: string): string | null => {
    if (!address.trim()) return "La dirección es requerida";
    if (address.trim().length < 10) return "La dirección es demasiado corta";
    return null;
  };
  
  export const validatePackageWeight = (weight: number): string | null => {
    if (!weight || weight <= 0) return "El peso debe ser mayor a 0";
    if (weight > 1000) return "El peso máximo permitido es de 1000 kg";
    return null;
  };
  
  export const validatePackageSize = (size: string): string | null => {
    if (!size.trim()) return "El tamaño es requerido";
    return null;
  };
  
  export const validateProductType = (type: string): string | null => {
    if (!type.trim()) return "El tipo de producto es requerido";
    return null;
  };
  
  export const validatePackageDescription = (description: string): string | null => {
    if (!description.trim()) return "La descripción es requerida";
    if (description.trim().length < 5) return "La descripción es demasiado corta";
    return null;
  };
  
  export const validatePackageValue = (value: number): string | null => {
    if (value < 0) return "El valor no puede ser negativo";
    return null;
  };