import { ReactNode } from "react";
import ShipmentProvider from "./shipment/ShipmentProvider";
import { TransporterProvider } from "./transporter/TransporterProvider";
import { RouteProvider } from "./route/RouteProvider";
import { ReportProvider } from "./report/ReportProvider";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <TransporterProvider>
                <ShipmentProvider>
                    <RouteProvider>
                        <ReportProvider>
                            {children}
                        </ReportProvider>
                    </RouteProvider>
                </ShipmentProvider>
            </TransporterProvider>
        </>
    );
};

export default Providers;