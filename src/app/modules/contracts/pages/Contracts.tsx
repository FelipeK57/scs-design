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
import { ListFilter, PlusIcon, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";

const mockContracts = [
  {
    id: 1,
    contractNumber: "CNT-2024-001",
    client: "Empresa A",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    amount: "$50,000",
    status: "Activo",
  },
  {
    id: 2,
    contractNumber: "CNT-2024-002",
    client: "Empresa B",
    startDate: "2024-03-20",
    endDate: "2024-12-20",
    amount: "$35,000",
    status: "Activo",
  },
  {
    id: 3,
    contractNumber: "CNT-2024-003",
    client: "Empresa C",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    amount: "$60,000",
    status: "Expirado",
  },
  {
    id: 4,
    contractNumber: "CNT-2024-004",
    client: "Empresa D",
    startDate: "2024-05-10",
    endDate: "2025-05-10",
    amount: "$45,000",
    status: "Activo",
  },
  {
    id: 5,
    contractNumber: "CNT-2024-005",
    client: "Empresa E",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    amount: "$28,000",
    status: "Por Vencer",
  },
  {
    id: 6,
    contractNumber: "CNT-2024-006",
    client: "Empresa A",
    startDate: "2024-02-15",
    endDate: "2025-02-15",
    amount: "$55,000",
    status: "Activo",
  },
  {
    id: 7,
    contractNumber: "CNT-2024-007",
    client: "Empresa B",
    startDate: "2024-04-20",
    endDate: "2025-04-20",
    amount: "$40,000",
    status: "Activo",
  },
  {
    id: 8,
    contractNumber: "CNT-2024-008",
    client: "Empresa C",
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    amount: "$65,000",
    status: "Expirado",
  },
  {
    id: 9,
    contractNumber: "CNT-2024-009",
    client: "Empresa D",
    startDate: "2024-06-10",
    endDate: "2026-06-10",
    amount: "$50,000",
    status: "Activo",
  },
  {
    id: 10,
    contractNumber: "CNT-2024-010",
    client: "Empresa E",
    startDate: "2024-08-01",
    endDate: "2025-01-31",
    amount: "$32,000",
    status: "Por Vencer",
  },
];

export const Contracts = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">Lista de Contratos</h1>

      <Table
        aria-label="Contratos table"
        selectionMode="single"
        removeWrapper
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
                to="/contracts/new"
                color="primary"
                className="min-w-fit"
                radius="sm"
                startContent={<PlusIcon className="size-4" />}
              >
                Crear Contrato
              </Button>
            </article>
          </article>
        }
        bottomContent={
          <article className="flex w-full justify-between items-center">
            <article className="flex items-center">
              <span className="text-sm">Items por página:</span>
              <Select
                radius="sm"
                className="ml-2 w-20"
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
                wrapper: "shadow-none",
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
          <TableColumn>NÚMERO CONTRATO</TableColumn>
          <TableColumn>CLIENTE</TableColumn>
          <TableColumn>FECHA INICIO</TableColumn>
          <TableColumn>FECHA FIN</TableColumn>
          <TableColumn>MONTO</TableColumn>
          <TableColumn>ESTADO</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No se han encontrado contratos.">
          {mockContracts.map((contract) => (
            <TableRow
              key={contract.id}
              className="cursor-pointer"
              onClick={() => navigate(`/contracts/${contract.id}`)}
            >
              <TableCell>{contract.contractNumber}</TableCell>
              <TableCell>{contract.client}</TableCell>
              <TableCell>{contract.startDate}</TableCell>
              <TableCell>{contract.endDate}</TableCell>
              <TableCell>{contract.amount}</TableCell>
              <TableCell>{contract.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
