import { Home, Plane, Settings, Users2 } from "lucide-react";
import { Link } from "react-router";

export const Sidebar = () => {
  const routes = [
    { name: "Home", icon: <Home className="size-5" />, path: "/" },
    { name: "Clients", icon: <Users2 className="size-5" />, path: "/clients" },
    { name: "Visits", icon: <Plane className="size-5" />, path: "/visits" },
    { name: "Settings", icon: <Settings className="size-5" />, path: "/settings" },
  ];

  return (
    <aside className="lg:flex flex-col w-72 min-h-svh border-r border-r-divider hidden">
      <div className="flex items-center p-6">
        <img src="/Logo.png" alt="ReaDx Logo" className="h-6 w-auto" />
      </div>
      <nav className="flex flex-col gap-4 p-6">
        {routes.map((route) => (
          <Link
            to={route.path}
            key={route.name}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
          >
            {route.icon}
            <span>{route.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
