import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";
import {
  ChevronLeft,
  User,
  Calendar,
  Clock,
  Building2,
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Wrench,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";

// Type definitions
interface PreventiveActivity {
  name: string;
  completed: boolean;
}

interface PendingActivity {
  name: string;
  reportedDate: string;
  completed: boolean;
}

interface ChecklistItem {
  task: string;
  completed: boolean;
}

interface BaseVisit {
  id: number;
  orderNumber: string;
  client: string;
  machine: string;
  responsible: string;
  status: string;
  date: string;
  duration: string;
  contractStatus: string;
  notes: string;
}

interface PreventiveVisit extends BaseVisit {
  visitType: "Mantenimiento";
  preventiveActivities: PreventiveActivity[];
  pendingActivities: PendingActivity[];
}

interface EmergencyVisit extends BaseVisit {
  visitType: "Emergencia";
  emergency: {
    initialProblem: string;
    previousActivities: string;
  };
}

interface AdditionalVisit extends BaseVisit {
  visitType: "Adicional";
  customChecklist: ChecklistItem[];
}

type VisitData = PreventiveVisit | EmergencyVisit | AdditionalVisit;

// Mock data
const mockVisitData: Record<number, VisitData> = {
  1: {
    id: 1,
    orderNumber: "OT-2024-001",
    client: "Empresa A",
    machine: "MP1 Cali",
    responsible: "Juan Pérez",
    visitType: "Mantenimiento",
    status: "Completada",
    date: "2024-06-15",
    duration: "3 días",
    contractStatus: "Activo",
    preventiveActivities: [
      { name: "Inspección visual de equipos", completed: true },
      { name: "Limpieza de componentes", completed: true },
      { name: "Calibración de instrumentos", completed: false },
      { name: "Verificación de seguridad", completed: true },
    ],
    pendingActivities: [
      {
        name: "Reparación de fallas",
        reportedDate: "2024-06-01",
        completed: true,
      },
      {
        name: "Sustitución de piezas",
        reportedDate: "2024-06-05",
        completed: false,
      },
    ],
    notes: "Mantenimiento preventivo completado exitosamente. Se reemplazaron filtros y se lubricaron componentes principales.",
  },
  2: {
    id: 2,
    orderNumber: "OT-2024-002",
    client: "Empresa B",
    machine: "MP2 Yumbo",
    responsible: "María Gómez",
    visitType: "Emergencia",
    status: "En Progreso",
    date: "2024-06-20",
    duration: "1 día",
    contractStatus: "Activo",
    emergency: {
      initialProblem:
        "El motor principal presenta vibraciones anormales y ruidos metálicos durante la operación. La temperatura del motor ha aumentado significativamente.",
      previousActivities:
        "Se realizó inspección visual sin encontrar daños externos. Se verificaron los niveles de lubricante y se encontraron dentro de rangos normales. Se revisó el balance del rotor sin encontrar irregularidades.",
    },
    notes: "Se continúa con el diagnóstico. Se requiere análisis de vibraciones especializado.",
  },
  3: {
    id: 3,
    orderNumber: "OT-2024-003",
    client: "Empresa C",
    machine: "MP3 Palmira",
    responsible: "Carlos López",
    visitType: "Adicional",
    status: "Pendiente",
    date: "2024-06-25",
    duration: "2 días",
    contractStatus: "No activo",
    customChecklist: [
      { task: "Revisión del sistema hidráulico", completed: false },
      { task: "Inspección de componentes eléctricos", completed: false },
      { task: "Verificación de sensores de temperatura", completed: false },
      { task: "Prueba de sistema de control", completed: false },
    ],
    notes: "Checklist solicitado por el cliente para auditoría interna.",
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completada":
      return "success";
    case "En Progreso":
      return "warning";
    case "Pendiente":
      return "secondary";
    default:
      return "default";
  }
};

const getContractStatusColor = (status: string) => {
  return status === "Activo" ? "success" : "danger";
};

const isEmergency = (visit: VisitData): visit is EmergencyVisit =>
  visit.visitType === "Emergencia";

const isPreventive = (visit: VisitData): visit is PreventiveVisit =>
  visit.visitType === "Mantenimiento";

const isAdditional = (visit: VisitData): visit is AdditionalVisit =>
  visit.visitType === "Adicional";

export const VisitDetails = () => {
  const { visitId } = useParams();
  const navigate = useNavigate();

  const visitData = mockVisitData[parseInt(visitId || "0", 10)];

  if (!visitData) {
    return (
      <main className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate("/visits")}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-semibold">Visita no encontrada</h1>
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
          onPress={() => navigate("/visits")}
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground">
              {visitData.orderNumber}
            </h1>
            <Chip
              color={getStatusColor(visitData.status) as any}
              variant="flat"
              size="lg"
            >
              {visitData.status}
            </Chip>
            <Chip variant="flat" size="lg">
              {visitData.visitType}
            </Chip>
          </div>
          <p className="text-sm text-default-500 mt-1">
            Cliente: {visitData.client} - Máquina: {visitData.machine}
          </p>
        </div>
      </article>

      {/* Visit Summary Card */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">
            Resumen de la visita
          </h2>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <User className="size-4" />
              <span className="text-sm font-medium">Responsable</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {visitData.responsible}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Building2 className="size-4" />
              <span className="text-sm font-medium">Máquina</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {visitData.machine}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Calendar className="size-4" />
              <span className="text-sm font-medium">Fecha</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {visitData.date}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Clock className="size-4" />
              <span className="text-sm font-medium">Duración</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {visitData.duration}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <CheckCircle2 className="size-4" />
              <span className="text-sm font-medium">Estado de contrato</span>
            </div>
            <Chip
              color={getContractStatusColor(visitData.contractStatus) as any}
              variant="flat"
              size="sm"
            >
              {visitData.contractStatus}
            </Chip>
          </div>
        </CardBody>
      </Card>

      {/* Conditional Content Based on Visit Type */}
      {isEmergency(visitData) && (
        <Card className="shadow-sm border-1 border-default-200 p-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-danger" />
              <h2 className="text-lg font-semibold text-foreground">
                Emergencia: Diagnóstico
              </h2>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-5">
            {/* Initial Problem */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-5 text-danger" />
                <h3 className="text-base font-semibold text-foreground">
                  Problema inicial
                </h3>
              </div>
              <div className="pl-7">
                <p className="text-sm text-default-700 leading-relaxed">
                  {visitData.emergency.initialProblem}
                </p>
              </div>
            </div>

            <Divider />

            {/* Previous Activities */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Wrench className="size-5 text-warning" />
                <h3 className="text-base font-semibold text-foreground">
                  Actividades previas (sin solución)
                </h3>
              </div>
              <div className="pl-7">
                <p className="text-sm text-default-700 leading-relaxed">
                  {visitData.emergency.previousActivities}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {isAdditional(visitData) && visitData.contractStatus === "No activo" && (
        <Card className="shadow-sm border-1 border-default-200 p-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardList className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Checklist solicitado por el cliente
              </h2>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-3">
            {visitData.customChecklist.map((item: ChecklistItem, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-content1 border border-default-200"
              >
                <div
                  className={`size-5 rounded-full flex items-center justify-center ${
                    item.completed ? "bg-success text-white" : "bg-default-200"
                  }`}
                >
                  {item.completed && <CheckCircle2 className="size-3" />}
                </div>
                <span
                  className={`text-sm font-medium flex-1 ${
                    item.completed
                      ? "text-default-500 line-through"
                      : "text-foreground"
                  }`}
                >
                  {item.task}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {isPreventive(visitData) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preventive Activities */}
          <Card className="shadow-sm border-1 border-default-200 p-4">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Wrench className="size-5 text-success" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Actividades preventivas
                  </h2>
                </div>
                <Chip size="sm" variant="flat">
                  {visitData.preventiveActivities.length}
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
              {visitData.preventiveActivities.map((activity: PreventiveActivity, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-content1 border border-default-200"
                >
                  <div
                    className={`size-5 rounded-full flex items-center justify-center ${
                      activity.completed
                        ? "bg-success text-white"
                        : "bg-default-200"
                    }`}
                    >
                      {activity.completed && <CheckCircle2 className="size-3" />}
                    </div>
                    <span
                      className={`text-sm font-medium flex-1 ${
                        activity.completed
                          ? "text-default-500 line-through"
                          : "text-foreground"
                      }`}
                    >
                      {activity.name}
                    </span>
                  </div>
                ))}
              </CardBody>
            </Card>

          {/* Pending Activities */}
          <Card className="shadow-sm border-1 border-default-200 p-4">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-warning" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Actividades pendientes
                  </h2>
                </div>
                <Chip size="sm" variant="flat" color="warning">
                  {visitData.pendingActivities.length}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                {visitData.pendingActivities.map((activity: PendingActivity, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-content1 border border-default-200"
                  >
                    <div
                      className={`size-5 rounded-full flex items-center justify-center mt-0.5 ${
                        activity.completed
                          ? "bg-success text-white"
                          : "bg-warning-100 text-warning"
                      }`}
                    >
                      {activity.completed && <CheckCircle2 className="size-3" />}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <span
                        className={`text-sm font-medium ${
                          activity.completed
                            ? "text-default-500 line-through"
                            : "text-foreground"
                        }`}
                      >
                        {activity.name}
                      </span>
                      <span className="text-xs text-default-400">
                        Reportado el: {activity.reportedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
        </div>
      )}

      {/* Notes Card */}
      {visitData.notes && (
        <Card className="shadow-sm border-1 border-default-200 p-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardList className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Notas adicionales
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-default-700 leading-relaxed">
              {visitData.notes}
            </p>
          </CardBody>
        </Card>
      )}

      {/* Action Buttons */}
      {/* <div className="flex justify-end gap-4">
        <Button variant="flat" size="lg">
          Editar
        </Button>
        <Button color="primary" variant="flat" size="lg">
          Generar reporte
        </Button>
      </div> */}
    </main>
  );
};
