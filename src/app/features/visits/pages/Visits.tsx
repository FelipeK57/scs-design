import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableColumn,
  TableHeader,
} from "@heroui/react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router";

export const Visits = () => {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-4">Visitas</h1>

      <div className="flex justify-between items-center mb-4">
        <Input
          className="max-w-sm"
          variant="bordered"
          isClearable
          placeholder="Buscar visitas..."
          startContent={<SearchIcon className="size-4 text-divider" />}
          onClear={() => {}}
        />
        <Button as={Link} to="/visits/new" color="primary" endContent={<PlusIcon className="size-4" />}>
          Crear Visita
        </Button>
      </div>

      <Table aria-label="Visitas table" className="mb-4" removeWrapper>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No se han encontrado visitas.">
          {/* Add your data mapping here */}
          {[]}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between w-full">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={1}
          total={20}
          onChange={() => {}}
        />
        <article>
          <Button className="mr-2">
            Anterior
          </Button>
          <Button>
            Siguiente
          </Button>
        </article>
      </div>
    </div>
  );
};
