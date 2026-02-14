import { Button } from "@heroui/react";
import { Factory, FileText, Headset, Home, Users2, X } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const routes = [
    { name: "Dashboard", icon: <Home className="size-5" />, path: "/" },
    { name: "Clientes", icon: <Users2 className="size-5" />, path: "/clients" },
    {
      name: "Contratos",
      icon: <FileText className="size-5" />,
      path: "/contracts",
    },
    { name: "Visitas", icon: <Factory className="size-5" />, path: "/visits" },
    {
      name: "Atenciones Remotas",
      icon: <Headset className="size-5" />,
      path: "/remote-support",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar para móvil (drawer) */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-72 bg-background border-r border-content3 dark:border-content1
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header del sidebar móvil */}
        <div className="flex items-center justify-between p-4 border-b border-content3 dark:border-content1">
          <img src="/Logo.png" alt="ReaDx Logo" className="h-6 w-auto" />
          <Button
            onPress={onClose}
            className="p-2"
            isIconOnly
            variant="light"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Navegación móvil */}
        <nav className="flex flex-col gap-2 p-4">
          {routes.map((route) => (
            <Link
              to={route.path}
              key={route.name}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all active:scale-95
                ${
                  isActive(route.path)
                    ? " text-primary-600 font-medium"
                    : "text-default-700 dark:text-default-500 hover:bg-default-100"
                }
              `}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar para desktop (fijo) */}
      <aside className="hidden lg:flex flex-col w-72 bg-background border-r border-content3 dark:border-content1">
        {/* Logo */}
        <div className="flex items-center px-6 py-5 border-b border-content3 dark:border-content1">
          <img src="/Logo.png" alt="ReaDx Logo" className="h-6 w-auto" />
        </div>

        {/* Navegación desktop */}
        <nav className="flex flex-col gap-2 p-4">
          {routes.map((route) => (
            <Link
              to={route.path}
              key={route.name}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all active:scale-95
                ${
                  isActive(route.path)
                    ? " text-primary-600 font-medium"
                    : "text-default-700 dark:text-default-500 hover:bg-default-100"
                }
              `}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
