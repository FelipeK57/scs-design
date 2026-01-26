import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  return (
    <main className="flex flex-col lg:flex-row min-h-svh w-full overflow-hidden">
      <Sidebar />
      <section className="flex-1 h-svh overflow-y-auto w-full p-6">
        <Outlet />
      </section>
    </main>
  );
};
