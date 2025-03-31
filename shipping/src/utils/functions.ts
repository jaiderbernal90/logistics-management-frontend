export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "entregado":
      return "success";
    case "en tránsito":
      return "processing";
    case "en espera":
      return "warning";
    case "cancelado":
      return "error";
    default:
      return "default";
  }
};
