import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "../components/layout/MainLayout";

// Routes
import { ReadxPresentation } from "../lib/ReadxPresentation";
import { Clients } from "../features/clients/pages/Clients";
import { Visits } from "../features/visits/pages/Visits";
import { NewVisit } from "../features/visits/pages/NewVisit";
import { NewClient } from "../features/clients/pages/NewClient";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ReadxPresentation />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/new" element={<NewClient />} />
          <Route path="visits" element={<Visits />} />
          <Route path="visits/new" element={<NewVisit />} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
