import {
  Button,
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

const mockVisits = [
  {
    id: 1,
    type: "Inspección",
    client: "Empresa A",
    responsible: "Juan Pérez",
    date: "2024-06-15",
    status: "Completada",
  },
  {
    id: 2,
    type: "Mantenimiento",
    client: "Empresa B",
    responsible: "María Gómez",
    date: "2024-06-20",
    status: "Pendiente",
  },
  {
    id: 3,
    type: "Instalación",
    client: "Empresa C",
    responsible: "Carlos López",
    date: "2024-06-25",
    status: "En Progreso",
  },
  {
    id: 4,
    type: "Inspección",
    client: "Empresa D",
    responsible: "Ana Martínez",
    date: "2024-06-30",
    status: "Completada",
  },
  {
    id: 5,
    type: "Mantenimiento",
    client: "Empresa E",
    responsible: "Luis Rodríguez",
    date: "2024-07-05",
    status: "Pendiente",
  },
  {
    id: 6,
    type: "Inspección",
    client: "Empresa A",
    responsible: "Juan Pérez",
    date: "2024-06-15",
    status: "Completada",
  },
  {
    id: 7,
    type: "Mantenimiento",
    client: "Empresa B",
    responsible: "María Gómez",
    date: "2024-06-20",
    status: "Pendiente",
  },
  {
    id: 8,
    type: "Instalación",
    client: "Empresa C",
    responsible: "Carlos López",
    date: "2024-06-25",
    status: "En Progreso",
  },
  {
    id: 9,
    type: "Inspección",
    client: "Empresa D",
    responsible: "Ana Martínez",
    date: "2024-06-30",
    status: "Completada",
  },
  {
    id: 10,
    type: "Mantenimiento",
    client: "Empresa E",
    responsible: "Luis Rodríguez",
    date: "2024-07-05",
    status: "Pendiente",
  },
];

export const Visits = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">Lista de Visitas</h1>

      <Table
        aria-label="Visitas table"
        selectionMode="single"
        removeWrapper
        topContent={
          <article className="flex flex-row justify-between gap-2">
            <Input
              className="max-w-xs"
              isClearable
              placeholder="Buscar..."
              startContent={<SearchIcon className="size-4" />}
              onClear={() => {}}
              radius="sm"
            />
            <article className="flex w-full justify-end items-center gap-2">
              <Button
                className="min-w-fit"
                variant="flat"
                radius="sm"
                startContent={<ListFilter className="size-4" />}
              >
                Filtros
              </Button>
              <Button
                as={Link}
                to="/visits/new"
                color="primary"
                className="min-w-fit"
                radius="sm"
                startContent={<PlusIcon className="size-4" />}
              >
                Crear Visita
              </Button>
            </article>
          </article>
        }
        bottomContent={
          <article className="flex w-full justify-between items-center">
            <article className="flex items-center">
              <span className="text-sm">Items por página:</span>
              <Select
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
              radius="sm"
              showControls
              disableAnimation
              classNames={{
                wrapper: "shadow-none",
              }}
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
          <TableColumn>TIPO</TableColumn>
          <TableColumn>CLIENTE</TableColumn>
          <TableColumn>RESPONSABLE</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>FECHA</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No se han encontrado visitas.">
          {mockVisits.map((visit) => (
            <TableRow
              key={visit.id}
              className="cursor-pointer "
              onClick={() => navigate(`/visits/${visit.id}`)}
            >
              <TableCell>{visit.id}</TableCell>
              <TableCell>{visit.type}</TableCell>
              <TableCell>{visit.client}</TableCell>
              <TableCell>{visit.responsible}</TableCell>
              <TableCell>{visit.status}</TableCell>
              <TableCell>{visit.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
