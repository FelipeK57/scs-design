import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "../components/layout/MainLayout";

// Routes
import { Clients } from "../modules/clients/pages/Clients";
import { ClientDetails } from "../modules/clients/pages/ClientDetails";
import { Visits } from "../modules/visits/pages/Visits";
import { NewVisit } from "../modules/visits/pages/NewVisit";
import { VisitDetails } from "../modules/visits/pages/VisitDetails";
import { NewClient } from "../modules/clients/pages/NewClient";
import { Contracts } from "../modules/contracts/pages/Contracts";
import { NewContract } from "../modules/contracts/pages/NewContract";
import { ContractDetails } from "../modules/contracts/pages/ContractDetails";
import { RemoteSupport } from "../modules/remote-support/pages/RemoteSupport";
import { NewRemoteSupport } from "../modules/remote-support/pages/NewRemoteSupport";
import { RemoteSupportDetails } from "../modules/remote-support/pages/RemoteSupportDetails";
import { Dashboard } from "../modules/dashboard/Dashboard";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* Clientes */}
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:clientId" element={<ClientDetails />} />
          <Route path="clients/new" element={<NewClient />} />
          {/* Visitas */}
          <Route path="visits" element={<Visits />} />
          <Route path="visits/new" element={<NewVisit />} />
          <Route path="visits/:visitId" element={<VisitDetails />} />
          {/* Contratos */}
          <Route path="contracts" element={<Contracts />} />
          <Route path="contracts/new" element={<NewContract />} />
          <Route path="contracts/:contractId" element={<ContractDetails />} />
          {/* Soporte Remoto */}
          <Route path="remote-support" element={<RemoteSupport />} />
          <Route path="remote-support/new" element={<NewRemoteSupport />} />
          <Route
            path="remote-support/:sessionId"
            element={<RemoteSupportDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
