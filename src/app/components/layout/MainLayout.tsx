import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-svh w-full overflow-hidden">
      {/* Sidebar a la izquierda */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Columna derecha: Header arriba y Content abajo */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Topbar */}
        <Header onMenuClick={toggleSidebar} />

        {/* Contenido principal con Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
