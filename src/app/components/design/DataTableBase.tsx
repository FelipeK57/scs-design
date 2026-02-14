import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Pagination,
  TableRow,
} from "@heroui/react";
import { ListFilter, PlusIcon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";

// ❌ No es un componente reutilizable, solo un ejemplo base de una tabla de datos
// Su objetivo es servir como punto de partida para crear nuevas tablas de datos en la app
// Incluye estructura básica con encabezados, filas, paginación, búsqueda y botones de acción

export const DataTableBase = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-2 w-full">
      {/* Nombre de la vista */}
      <h1 className="text-xl font-semibold">Data Table Base</h1>
      {/* Tabla de datos */}
      <Table
        aria-label="Data Table Base Example"
        removeWrapper
        selectionMode="single"
        topContent={
          <>
            {/* Contenido superior de la tabla */}
            <article className="flex flex-row justify-between gap-2">
              <Input
                className="max-w-xs"
                variant="bordered"
                isClearable
                placeholder="Buscar datos..."
                startContent={<SearchIcon className="size-4 text-divider" />}
                onClear={() => {}}
              />
              <article className="flex w-full justify-end items-center gap-2">
                <Button
                  className="min-w-fit"
                  variant="flat"
                  startContent={<ListFilter className="size-4" />}
                >
                  Filtros
                </Button>
                <Button
                  color="primary"
                  className="min-w-fit"
                  startContent={<PlusIcon className="size-4" />}
                >
                  Crear dato
                </Button>
              </article>
            </article>
          </>
        }
        bottomContent={
          <>
            {/* Contenido inferior de la tabla */}
            <article className="flex w-full justify-between items-center">
              <article className="flex items-center">
                <span className="text-sm">Items por página:</span>
                <Select
                  variant="bordered"
                  className="ml-2 w-20"
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
                showShadow
                color="primary"
                page={1}
                total={20}
                onChange={() => {}}
              />
            </article>
          </>
        }
      >
        <TableHeader>
          {/* Encabezados de la tabla */}
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
          <TableCell>Header 3</TableCell>
        </TableHeader>
        <TableBody>
          <TableRow
            key="1"
            className="cursor-pointer"
            onClick={() => {
              // Lógica para manejar el clic en la fila, por ejemplo, navegar a detalles
              navigate(`/module/details/${1}`);
            }}
          >
            {/* Filas de datos de ejemplo, lo ideal es mapear datos reales */}
            <TableCell>Data 1</TableCell>
            <TableCell>Data 2</TableCell>
            <TableCell>Data 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
};
