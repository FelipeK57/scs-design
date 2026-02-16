import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  ChevronLeft,
  Calendar,
  Building2,
  Gift,
  History,
  Wrench,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";

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
  startDate: string;
  endDate: string;
  duration: string;
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
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    duration: "12 meses",
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
    startDate: "2024-03-20",
    endDate: "2024-12-20",
    duration: "9 meses",
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
    startDate: "2024-05-10",
    endDate: "2025-05-10",
    duration: "12 meses",
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
    startDate: "2024-06-10",
    endDate: "2026-06-10",
    duration: "24 meses",
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

const getBenefitStatusColor = (status: string) => {
  return status === "Activo" ? "success" : "warning";
};

export const ContractDetails = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();

  const contractData = mockContractData[parseInt(contractId || "0", 10)];

  if (!contractData) {
    return (
      <main className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate("/contracts")}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-semibold">Contrato no encontrado</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 pb-8">
      {/* Header Section */}
      <article className="flex flex-row gap-3 items-center">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          className="hover:bg-default-100"
          onPress={() => navigate("/contracts")}
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground">
              {contractData.contractNumber}
            </h1>
            <Chip
              color={getStatusColor(contractData.status) as any}
              variant="flat"
              size="lg"
            >
              {contractData.status}
            </Chip>
          </div>
          <p className="text-sm text-default-500 mt-1">
            Cliente: {contractData.client} - Máquina: {contractData.machine}
          </p>
        </div>
      </article>

      {/* Contract Summary Card */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">
            Resumen del contrato
          </h2>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Calendar className="size-4" />
              <span className="text-sm font-medium">Vigencia</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {contractData.duration}
            </p>
            <p className="text-xs text-default-400">
              {contractData.startDate} a {contractData.endDate}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Building2 className="size-4" />
              <span className="text-sm font-medium">Cliente</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {contractData.client}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Wrench className="size-4" />
              <span className="text-sm font-medium">Máquina</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {contractData.machine}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Gift className="size-4" />
              <span className="text-sm font-medium">Valor del contrato</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {contractData.amount}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Benefits Card */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Gift className="size-5 text-success" />
              <h2 className="text-lg font-semibold text-foreground">
                Beneficios incluidos
              </h2>
            </div>
            <Chip size="sm" variant="flat">
              {contractData.benefits.length}
            </Chip>
          </div>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contractData.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-content1 border border-default-200"
            >
              <div className="flex items-center gap-3 flex-1">
                <CheckCircle2 className="size-5 text-success shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {benefit.name}
                </span>
              </div>
              <Chip
                color={getBenefitStatusColor(benefit.status) as any}
                variant="flat"
                size="sm"
              >
                {benefit.status}
              </Chip>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Visits History Table */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Historial de visitas
            </h2>
          </div>
        </CardHeader>
        <CardBody>
          {contractData.visits.length > 0 ? (
            <Table aria-label="Historial de visitas">
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
        </CardBody>
      </Card>

      {/* Remote Support History Table */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PhoneCall className="size-5 text-warning" />
            <h2 className="text-lg font-semibold text-foreground">
              Historial de atenciones remotas
            </h2>
          </div>
        </CardHeader>
        <CardBody>
          {contractData.remoteSessions.length > 0 ? (
            <Table aria-label="Historial de atenciones remotas">
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
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="flat" size="lg">
          Editar
        </Button>
        <Button color="primary" variant="flat" size="lg">
          Renovar contrato
        </Button>
      </div>
    </main>
  );
};
