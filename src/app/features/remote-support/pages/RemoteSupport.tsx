import {
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ListFilter, PlusIcon, SearchIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

const mockRemoteSessions = [
  {
    id: 1,
    client: "Empresa A",
    technician: "Juan Pérez",
    issueType: "Soporte Técnico",
    startTime: "2024-06-15 10:00",
    duration: "45 min",
    status: "Completada",
  },
  {
    id: 2,
    client: "Empresa B",
    technician: "María Gómez",
    issueType: "Configuración",
    startTime: "2024-06-15 14:30",
    duration: "60 min",
    status: "En Progreso",
  },
  {
    id: 3,
    client: "Empresa C",
    technician: "Carlos López",
    issueType: "Mantenimiento",
    startTime: "2024-06-15 09:15",
    duration: "30 min",
    status: "Completada",
  },
  {
    id: 4,
    client: "Empresa D",
    technician: "Ana Martínez",
    issueType: "Soporte Técnico",
    startTime: "2024-06-15 16:00",
    duration: "-",
    status: "En Espera",
  },
  {
    id: 5,
    client: "Empresa E",
    technician: "Luis Rodríguez",
    issueType: "Resolución de Problemas",
    startTime: "2024-06-15 11:00",
    duration: "90 min",
    status: "Completada",
  },
  {
    id: 6,
    client: "Empresa A",
    technician: "Juan Pérez",
    issueType: "Capacitación",
    startTime: "2024-06-14 13:00",
    duration: "120 min",
    status: "Completada",
  },
  {
    id: 7,
    client: "Empresa B",
    technician: "María Gómez",
    issueType: "Soporte Técnico",
    startTime: "2024-06-14 10:30",
    duration: "50 min",
    status: "Completada",
  },
  {
    id: 8,
    client: "Empresa C",
    technician: "Carlos López",
    issueType: "Configuración",
    startTime: "2024-06-15 15:45",
    duration: "-",
    status: "En Progreso",
  },
  {
    id: 9,
    client: "Empresa D",
    technician: "Ana Martínez",
    issueType: "Mantenimiento",
    startTime: "2024-06-14 09:00",
    duration: "75 min",
    status: "Completada",
  },
  {
    id: 10,
    client: "Empresa E",
    technician: "Luis Rodríguez",
    issueType: "Soporte Técnico",
    startTime: "2024-06-15 08:00",
    duration: "40 min",
    status: "Completada",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completada":
      return "success";
    case "En Progreso":
      return "warning";
    case "En Espera":
      return "secondary";
    default:
      return "default";
  }
};

export const RemoteSupport = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">Lista de Atenciones Remotas</h1>

      <Table
        aria-label="Atenciones Remotas table"
        selectionMode="single"
        removeWrapper
        topContent={
          <article className="space-y-2">
            <p className="text-xs">Resultados (100)</p>
            <article className="flex flex-row justify-between gap-2">
              <Input
                className="max-w-xs"
                radius="sm"
                variant="bordered"
                isClearable
                placeholder="Buscar..."
                onClear={() => {}}
              />
              <article className="flex w-full justify-end items-center gap-2">
                <Button className="min-w-fit" radius="sm" variant="flat">
                  Filtros
                </Button>
                <Button
                  as={Link}
                  to="/remote-support/new"
                  color="primary"
                  className="min-w-fit"
                  radius="sm"
                >
                  Crear Atención
                </Button>
              </article>
            </article>
          </article>
        }
        bottomContent={
          <article className="flex w-full justify-between items-center">
            <article className="flex items-center">
              <span className="text-sm">Items por página:</span>
              <Select
                variant="bordered"
                className="ml-2 w-20"
                radius="sm"
                aria-label="Cantidad items"
                aria-labelledby="Items por página"
                size="sm"
                defaultSelectedKeys={[(10).toString()]}
                disallowEmptySelection
              >
                <SelectItem key={5}>5</SelectItem>
                <SelectItem key={10}>10</SelectItem>
                <SelectItem key={20}>20</SelectItem>
              </Select>
            </article>
            <Pagination
              isCompact
              showControls
              disableAnimation
              classNames={{
                wrapper: "shadow-none"
              }}
              radius="sm"
              color="primary"
              page={1}
              total={20}
              onChange={() => {}}
            />
          </article>
        }
      >
        <TableHeader>
          <TableColumn>OT</TableColumn>
          <TableColumn>CLIENTE</TableColumn>
          <TableColumn>TÉCNICO</TableColumn>
          <TableColumn>TIPO DE PROBLEMA</TableColumn>
          <TableColumn>INICIO</TableColumn>
          <TableColumn>DURACIÓN</TableColumn>
          <TableColumn>ESTADO</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No se han encontrado atenciones remotas.">
          {mockRemoteSessions.map((session) => (
            <TableRow
              key={session.id}
              className="cursor-pointer"
              onClick={() => navigate(`/remote-support/${session.id}`)}
            >
              <TableCell>{session.id}</TableCell>
              <TableCell>{session.client}</TableCell>
              <TableCell>{session.technician}</TableCell>
              <TableCell>{session.issueType}</TableCell>
              <TableCell>{session.startTime}</TableCell>
              <TableCell>{session.duration}</TableCell>
              <TableCell>
                <Chip
                  color={getStatusColor(session.status) as any}
                  size="sm"
                  variant="flat"
                >
                  {session.status}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
