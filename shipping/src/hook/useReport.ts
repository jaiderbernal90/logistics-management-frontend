import { useContext } from "react";
import ReportContext from "../context/report/ReportContext";

export const useReport = () => {
  const context = useContext(ReportContext);

  if (context === undefined) {
    throw new Error(
      "useReport debe ser usado dentro de un ReportProvider"
    );
  }

  return context;
};
