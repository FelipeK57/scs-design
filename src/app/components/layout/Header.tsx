import { useThemeStore } from "@/app/stores/theme.store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-content3 dark:border-content1 bg-background px-4 py-3 md:px-6">
      {/* Botón hamburguesa para móvil */}
      <Button
        onPress={onMenuClick}
        className="lg:hidden"
        isIconOnly
        aria-label="Toggle menu"
        variant="light"
      >
        <Menu className="size-5" />
      </Button>

      {/* Logo en móvil */}
      <div className="lg:hidden">
        <img src="/Logo.png" alt="ReaDx Logo" className="h-6 w-auto" />
      </div>

      {/* Espaciador */}
      <div className="flex-1" />

      {/* Usuario */}
      <Dropdown>
        <DropdownTrigger>
          <User
            avatarProps={{
              showFallback: true,
              src: `https://api.dicebear.com/9.x/thumbs/svg?seed=Erick`,
            }}
            className="cursor-pointer"
            classNames={{
              name: "hidden sm:block",
              description: "hidden sm:block",
            }}
            name="Erick Espitia"
            description="Administrator"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="toggle-theme"
            variant="light"
            onPress={toggleTheme}
          >
            Modo {theme === "light" ? "oscuro" : "claro"}
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            variant="flat"
            onPress={handleLogout}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};
