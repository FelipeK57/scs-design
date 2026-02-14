import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "../components/layout/MainLayout";

// Routes
import { Clients } from "../features/clients/pages/Clients";
import { ClientDetails } from "../features/clients/pages/ClientDetails";
import { Visits } from "../features/visits/pages/Visits";
import { NewVisit } from "../features/visits/pages/NewVisit";
import { VisitDetails } from "../features/visits/pages/VisitDetails";
import { NewClient } from "../features/clients/pages/NewClient";
import { Contracts } from "../features/contracts/pages/Contracts";
import { NewContract } from "../features/contracts/pages/NewContract";
import { ContractDetails } from "../features/contracts/pages/ContractDetails";
import { RemoteSupport } from "../features/remote-support/pages/RemoteSupport";
import { NewRemoteSupport } from "../features/remote-support/pages/NewRemoteSupport";
import { RemoteSupportDetails } from "../features/remote-support/pages/RemoteSupportDetails";
import { Dashboard } from "../features/dashboard/Dashboard";

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
