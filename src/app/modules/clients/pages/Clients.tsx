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
import { ListFilter, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";

const mockClients = [
  {
    id: 1,
    machine: "MAQUINA-001",
    name: "Empresa A",
    contract: "CNT-2024-001",
  },
  {
    id: 2,
    machine: "MAQUINA-002",
    name: "Empresa B",
    contract: "CNT-2024-002",
  },
  {
    id: 3,
    machine: "MAQUINA-003",
    name: "Empresa C",
    contract: "CNT-2024-003",
  },
  {
    id: 4,
    machine: "MAQUINA-004",
    name: "Empresa D",
    contract: "CNT-2024-004",
  },
  {
    id: 5,
    machine: "MAQUINA-005",
    name: "Empresa E",
    contract: "CNT-2024-005",
  },
  {
    id: 6,
    machine: "MAQUINA-006",
    name: "Empresa F",
    contract: "CNT-2024-006",
  },
  {
    id: 7,
    machine: "MAQUINA-007",
    name: "Empresa G",
    contract: "CNT-2024-007",
  },
  {
    id: 8,
    machine: "MAQUINA-008",
    name: "Empresa H",
    contract: "CNT-2024-008",
  },
  {
    id: 9,
    machine: "MAQUINA-009",
    name: "Empresa I",
    contract: "CNT-2024-009",
  },
  {
    id: 10,
    machine: "MAQUINA-010",
    name: "Empresa J",
    contract: "CNT-2024-010",
  },
];

export const Clients = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">Lista de Clientes</h1>

      <Table
        aria-label="Clientes table"
        removeWrapper
        selectionMode="single"
        topContent={
          <article className="flex flex-row justify-between gap-2">
            <Input
              className="max-w-xs"
              radius="sm"
              isClearable
              placeholder="Buscar..."
              startContent={<Search className="size-4" />}
              onClear={() => {}}
            />
            <article className="flex w-full justify-end items-center gap-2">
              <Button
                className="min-w-fit"
                radius="sm"
                variant="flat"
                startContent={<ListFilter className="size-4" />}
              >
                Filtros
              </Button>
              <Button
                as={Link}
                to="/clients/new"
                color="primary"
                className="min-w-fit"
                radius="sm"
                startContent={<Plus className="size-4" />}
              >
                Crear Cliente
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
                size="sm"
                radius="sm"
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
                wrapper: "shadow-none",
              }}
              radius="sm"
              color="primary"
              page={1}
              total={5}
              onChange={() => {}}
            />
          </article>
        }
      >
        <TableHeader>
          <TableColumn>MAQUINA</TableColumn>
          <TableColumn>CLIENTE</TableColumn>
          <TableColumn>CONTRATO</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No se han encontrado clientes.">
          {mockClients.map((client) => (
            <TableRow
              key={client.id}
              className="cursor-pointer"
              onClick={() => navigate(`/clients/${client.id}`)}
            >
              <TableCell>{client.machine}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.contract}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
