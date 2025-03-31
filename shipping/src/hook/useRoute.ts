import { useContext } from "react";
import RouteContext from "../context/route/RouteContext";

export const useRoute = () => {
  const context = useContext(RouteContext);

  if (context === undefined) {
    throw new Error(
      "useRoute debe ser usado dentro de un RouteProvider"
    );
  }

  return context;
};
