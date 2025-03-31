import { useContext } from "react";
import ShipmentContext from "../context/ShipmentContext";

export const useShipment = () => {
  const context = useContext(ShipmentContext);

  if (context === undefined) {
    throw new Error("useShipment debe ser usado dentro de un ShipmentProvider");
  }

  return context;
};