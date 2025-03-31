import { useContext } from "react";
import TransporterContext from "../context/transporter/TransporterContext";

export const useTransporter = () => {
  const context = useContext(TransporterContext);

  if (context === undefined) {
    throw new Error(
      "useTransportador debe ser usado dentro de un TransportadorProvider"
    );
  }

  return context;
};
