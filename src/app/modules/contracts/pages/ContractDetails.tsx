import {
  Button,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Link, useParams } from "react-router";

// Type definitions
interface ContractBenefit {
  name: string;
  status: "Activo" | "Usado";
}

interface Visit {
  id: number;
  orderNumber: string;
  machine: string;
  date: string;
  responsible: string;
  type: string;
  duration: string;
  status: "Completada" | "En Progreso" | "Pendiente";
}

interface RemoteSupport {
  id: number;
  ticket: string;
  machine: string;
  date: string;
  technician: string;
  issueType: string;
  duration: string;
  status: "Completada" | "En Progreso" | "En Espera";
}

interface ContractDetail {
  id: number;
  contractNumber: string;
  client: string;
  machine: string;
  equipment: string;
  startDate: string;
  endDate: string;
  visitDays: number;
  emergencyVisitDays: number;
  status: "Activo" | "Por Vencer" | "Expirado";
  amount: string;
  benefits: ContractBenefit[];
  visits: Visit[];
  remoteSessions: RemoteSupport[];
}

// Mock data
const mockContractData: Record<number, ContractDetail> = {
  1: {
    id: 1,
    contractNumber: "CNT-2024-001",
    client: "Empresa A",
    machine: "MP1 Cali",
    equipment: "Motor Principal",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    visitDays: 12,
    emergencyVisitDays: 2,
    status: "Activo",
    amount: "$50,000",
    benefits: [
      { name: "Mantenimiento preventivo mensual", status: "Activo" },
      { name: "Asistencia técnica 24/7", status: "Activo" },
      { name: "Repuestos con descuento 15%", status: "Activo" },
      { name: "Capacitación de operadores", status: "Usado" },
      { name: "Inspección trimestral", status: "Activo" },
    ],
    visits: [
      {
        id: 1,
        orderNumber: "OT-2024-001",
        machine: "MP1 Cali",
        date: "2024-06-15",
        responsible: "Juan Pérez",
        type: "Mantenimiento",
        duration: "3 días",
        status: "Completada",
      },
      {
        id: 2,
        orderNumber: "OT-2024-005",
        machine: "MP1 Cali",
        date: "2024-09-20",
        responsible: "María Gómez",
        type: "Mantenimiento",
        duration: "2 días",
        status: "Completada",
      },
      {
        id: 3,
        orderNumber: "OT-2024-012",
        machine: "MP1 Cali",
        date: "2024-12-10",
        responsible: "Carlos López",
        type: "Inspección",
        duration: "1 día",
        status: "Completada",
      },
    ],
    remoteSessions: [
      {
        id: 1,
        ticket: "RS-2024-001",
        machine: "MP1 Cali",
        date: "2024-05-10",
        technician: "Ana Silva",
        issueType: "Diagnóstico",
        duration: "2 horas",
        status: "Completada",
      },
      {
        id: 2,
        ticket: "RS-2024-008",
        machine: "MP1 Cali",
        date: "2024-08-22",
        technician: "Roberto Torres",
        issueType: "Soporte técnico",
        duration: "1.5 horas",
        status: "Completada",
      },
      {
        id: 3,
        ticket: "RS-2024-015",
        machine: "MP1 Cali",
        date: "2024-11-05",
        technician: "Ana Silva",
        issueType: "Consultoría",
        duration: "3 horas",
        status: "Completada",
      },
    ],
  },
  2: {
    id: 2,
    contractNumber: "CNT-2024-002",
    client: "Empresa B",
    machine: "MP1 Bogotá",
    equipment: "Compresor",
    startDate: "2024-03-20",
    endDate: "2024-12-20",
    visitDays: 8,
    emergencyVisitDays: 1,
    status: "Activo",
    amount: "$35,000",
    benefits: [
      { name: "Mantenimiento preventivo mensual", status: "Activo" },
      { name: "Asistencia técnica 24/7", status: "Activo" },
      { name: "Repuestos con descuento 15%", status: "Activo" },
      { name: "Inspección trimestral", status: "Activo" },
    ],
    visits: [
      {
        id: 4,
        orderNumber: "OT-2024-004",
        machine: "MP1 Bogotá",
        date: "2024-07-12",
        responsible: "Juan Pérez",
        type: "Mantenimiento",
        duration: "2 días",
        status: "Completada",
      },
      {
        id: 5,
        orderNumber: "OT-2024-018",
        machine: "MP1 Bogotá",
        date: "2024-10-28",
        responsible: "María Gómez",
        type: "Reparación",
        duration: "1 día",
        status: "Completada",
      },
    ],
    remoteSessions: [
      {
        id: 4,
        ticket: "RS-2024-002",
        machine: "MP1 Bogotá",
        date: "2024-04-05",
        technician: "Roberto Torres",
        issueType: "Diagnóstico",
        duration: "1 hora",
        status: "Completada",
      },
      {
        id: 5,
        ticket: "RS-2024-020",
        machine: "MP1 Bogotá",
        date: "2024-11-18",
        technician: "Ana Silva",
        issueType: "Soporte técnico",
        duration: "2 horas",
        status: "Completada",
      },
    ],
  },
  4: {
    id: 4,
    contractNumber: "CNT-2024-004",
    client: "Empresa D",
    machine: "MP5 Quindío",
    equipment: "Sistema Eléctrico",
    startDate: "2024-05-10",
    endDate: "2025-05-10",
    visitDays: 10,
    emergencyVisitDays: 2,
    status: "Activo",
    amount: "$45,000",
    benefits: [
      { name: "Mantenimiento preventivo mensual", status: "Activo" },
      { name: "Asistencia técnica 24/7", status: "Activo" },
      { name: "Repuestos con descuento 15%", status: "Usado" },
      { name: "Capacitación de operadores", status: "Activo" },
      { name: "Diagnóstico de vibraciones", status: "Activo" },
    ],
    visits: [
      {
        id: 6,
        orderNumber: "OT-2024-008",
        machine: "MP5 Quindío",
        date: "2024-08-15",
        responsible: "Carlos López",
        type: "Mantenimiento",
        duration: "2 días",
        status: "Completada",
      },
    ],
    remoteSessions: [
      {
        id: 6,
        ticket: "RS-2024-010",
        machine: "MP5 Quindío",
        date: "2024-06-20",
        technician: "Roberto Torres",
        issueType: "Soporte técnico",
        duration: "2.5 horas",
        status: "Completada",
      },
      {
        id: 7,
        ticket: "RS-2024-025",
        machine: "MP5 Quindío",
        date: "2024-12-01",
        technician: "Ana Silva",
        issueType: "Diagnóstico",
        duration: "1.5 horas",
        status: "Completada",
      },
    ],
  },
  9: {
    id: 9,
    contractNumber: "CNT-2024-009",
    client: "Empresa D",
    machine: "MP5 Quindío",
    equipment: "Diagnóstico de vibraciones",
    startDate: "2024-06-10",
    endDate: "2026-06-10",
    visitDays: 15,
    emergencyVisitDays: 3,
    status: "Activo",
    amount: "$50,000",
    benefits: [
      { name: "Mantenimiento preventivo mensual", status: "Activo" },
      { name: "Asistencia técnica 24/7", status: "Activo" },
      { name: "Repuestos con descuento 15%", status: "Activo" },
      { name: "Capacitación de operadores", status: "Activo" },
      { name: "Inspección trimestral", status: "Activo" },
      { name: "Diagnóstico de vibraciones", status: "Activo" },
      { name: "Calibración de instrumentos", status: "Activo" },
    ],
    visits: [
      {
        id: 7,
        orderNumber: "OT-2024-010",
        machine: "MP5 Quindío",
        date: "2024-09-05",
        responsible: "Juan Pérez",
        type: "Mantenimiento",
        duration: "3 días",
        status: "Completada",
      },
      {
        id: 8,
        orderNumber: "OT-2024-020",
        machine: "MP5 Quindío",
        date: "2024-12-15",
        responsible: "María Gómez",
        type: "Inspección",
        duration: "1 día",
        status: "En Progreso",
      },
    ],
    remoteSessions: [
      {
        id: 8,
        ticket: "RS-2024-012",
        machine: "MP5 Quindío",
        date: "2024-07-10",
        technician: "Roberto Torres",
        issueType: "Diagnóstico",
        duration: "2 horas",
        status: "Completada",
      },
      {
        id: 9,
        ticket: "RS-2024-018",
        machine: "MP5 Quindío",
        date: "2024-10-25",
        technician: "Ana Silva",
        issueType: "Soporte técnico",
        duration: "1.5 horas",
        status: "Completada",
      },
      {
        id: 10,
        ticket: "RS-2024-030",
        machine: "MP5 Quindío",
        date: "2024-12-20",
        technician: "Roberto Torres",
        issueType: "Consultoría",
        duration: "3 horas",
        status: "En Progreso",
      },
    ],
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Activo":
      return "success";
    case "Por Vencer":
      return "warning";
    case "Expirado":
      return "danger";
    case "Completada":
      return "success";
    case "En Progreso":
      return "warning";
    case "Pendiente":
      return "secondary";
    case "En Espera":
      return "secondary";
    default:
      return "default";
  }
};

export const ContractDetails = () => {
  const { contractId } = useParams();

  const contractData = mockContractData[parseInt(contractId || "0", 10)];

  if (!contractData) {
    return (
      <main className="flex flex-col gap-8 w-full">
        <article className="flex flex-col items-start gap-4">
          <Link to="/contracts" className="text-xs border-b">
            Volver
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Contrato no encontrado
          </h1>
        </article>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8">
      {/* Header Section */}
      <article className="flex flex-col items-start gap-4">
        <Link to="/contracts" className="text-xs border-b">
          Volver
        </Link>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">
              {contractData.contractNumber}
            </h1>
            <Chip
              color={getStatusColor(contractData.status) as any}
              variant="flat"
              size="sm"
            >
              {contractData.status}
            </Chip>
          </div>
          <p className="text-sm text-default-500 mt-1">
            Cliente: {contractData.client} · Máquina: {contractData.machine}
          </p>
        </div>
      </article>

      {/* Contract summary */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">Resumen del contrato</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Cliente
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.client}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Máquina
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.machine}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Equipo
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.equipment}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Fecha de inicio
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.startDate}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Fecha de fin
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.endDate}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Días de visitas
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.visitDays}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Días de visitas de emergencia
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.emergencyVisitDays}
            </p>
          </div>
        </section>
      </section>

      <Divider />

      {/* Contract current state */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">
          Estado actual del contrato
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Días restantes
            </span>
            <p className="text-sm font-medium text-foreground">
              {Math.ceil(
                (new Date(contractData.endDate).getTime() -
                  new Date(contractData.startDate).getTime()) /
                  (1000 * 60 * 60 * 24),
              )}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Visitas restantes
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.visitDays - contractData.visits.length}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Visitas de emergencia restantes
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.emergencyVisitDays -
                contractData.visits.filter(
                  (visit) => visit.type === "Emergencia",
                ).length}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Visitas asociadas al contrato
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.visits.length} visitas registradas
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Atenciones remotas asociadas
            </span>
            <p className="text-sm font-medium text-foreground">
              {contractData.remoteSessions.length} atenciones remotas
            </p>
          </div>
        </section>
      </section>

      <Divider />

      {/* Visits History */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">Historial de visitas</h2>
        {contractData.visits.length > 0 ? (
          <Table aria-label="Historial de visitas" removeWrapper>
            <TableHeader>
              <TableColumn>OT</TableColumn>
              <TableColumn>Máquina</TableColumn>
              <TableColumn>Fecha</TableColumn>
              <TableColumn>Responsable</TableColumn>
              <TableColumn>Tipo</TableColumn>
              <TableColumn>Duración</TableColumn>
              <TableColumn>Estado</TableColumn>
            </TableHeader>
            <TableBody>
              {contractData.visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell className="font-semibold text-foreground">
                    {visit.orderNumber}
                  </TableCell>
                  <TableCell>{visit.machine}</TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>{visit.responsible}</TableCell>
                  <TableCell>{visit.type}</TableCell>
                  <TableCell>{visit.duration}</TableCell>
                  <TableCell>
                    <Chip
                      color={getStatusColor(visit.status) as any}
                      variant="flat"
                      size="sm"
                    >
                      {visit.status}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-default-500">
            No hay visitas registradas para este contrato.
          </p>
        )}
      </section>

      <Divider />

      {/* Remote Support History */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">
          Historial de atenciones remotas
        </h2>
        {contractData.remoteSessions.length > 0 ? (
          <Table aria-label="Historial de atenciones remotas" removeWrapper>
            <TableHeader>
              <TableColumn>Ticket</TableColumn>
              <TableColumn>Máquina</TableColumn>
              <TableColumn>Fecha</TableColumn>
              <TableColumn>Técnico</TableColumn>
              <TableColumn>Tipo de asunto</TableColumn>
              <TableColumn>Duración</TableColumn>
              <TableColumn>Estado</TableColumn>
            </TableHeader>
            <TableBody>
              {contractData.remoteSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-semibold text-foreground">
                    {session.ticket}
                  </TableCell>
                  <TableCell>{session.machine}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.technician}</TableCell>
                  <TableCell>{session.issueType}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>
                    <Chip
                      color={getStatusColor(session.status) as any}
                      variant="flat"
                      size="sm"
                    >
                      {session.status}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-default-500">
            No hay atenciones remotas registradas para este contrato.
          </p>
        )}
      </section>

      {/* Action Buttons */}
      <section className="flex justify-end gap-4">
        <Button radius="sm" variant="light">
          Editar
        </Button>
        <Button radius="sm" color="primary">
          Renovar contrato
        </Button>
      </section>
    </main>
  );
};
